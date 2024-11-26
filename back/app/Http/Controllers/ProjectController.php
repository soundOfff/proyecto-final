<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectMemberRequest;
use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ProjectResourceCollection;
use App\Http\Resources\ProjectSelectResourceCollection;
use App\Models\Expense;
use App\Models\Invoice;
use App\Models\Partner;
use App\Models\Procedure;
use App\Models\Project;
use App\Models\Staff;
use App\Models\Task;
use App\Models\TaskPriority;
use App\Models\TaskRepeat;
use App\Models\TaskStatus;
use App\Models\TaskTimer;
use App\Services\NotificationService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProjectController extends Controller
{
    public function __construct(protected NotificationService $notificationService)
    {
    }

    public function select(Partner $partner)
    {
        $projects = Project::where('billable_partner_id', $partner->id)
            ->select('id', 'name')
            ->get();

        return new ProjectSelectResourceCollection($projects);
    }

    public function selectAll()
    {
        $projects = Project::select('id', 'name')->limit(50)->get();

        return new ProjectSelectResourceCollection($projects);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Project::class)
            ->allowedFilters([
                AllowedFilter::exact('status', 'status.id'),
                AllowedFilter::scope('search'),
                AllowedFilter::exact('billable_partner_id'),
                AllowedFilter::callback(
                    'staff_id',
                    function (Builder $query, $value) {
                        $query
                            ->whereHas(
                                'members',
                                fn (Builder $query) => $query->where('staff_id', $value)
                            );
                    }
                ),
            ])
            ->allowedIncludes([
                'stages',
                'notes',
                'status',
                'jurisdiction',
                'serviceType.processes',
                'billablePartner',
                'billingType',
                'responsiblePerson',
                'files',
                'lawFirm',
                'members',
                'staffs',
                'partners',
                'proposal',
                'process',
                'court',
            ])->orderBy('id', 'desc');

        $projects = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new ProjectResourceCollection($projects);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        $newProject = $request->validated();
        $projectMemberIds = array_map(fn ($member) => $member['id'], $request->get('project_members'));
        $notes = $request['notes'] ?: [];

        $partnersToAttach = [];
        foreach ($request->get('partners') as $partner) {
            $partnersToAttach[$partner['id']] = [
                'role_id' => $partner['role_id'],
                'owner_id' => isset($partner['owner_id']) ? $partner['owner_id'] : null,
            ];
        }

        $newProject['name'] = 'New project';

        $project = Project::create($newProject);

        $project->members()->attach($projectMemberIds);
        $project->partners()->attach($partnersToAttach);
        $project->notes()->createMany($notes);

        $project->setName();

        $task = Task::create([
            'name' => 'Data entry',
            'hourly_rate' => 0.25,
            'task_priority_id' => TaskPriority::DEFAULT,
            'task_status_id' => TaskStatus::COMPLETED,
            'owner_id' => $project->responsiblePerson->id,
            'taskable_id' => $project->id,
            'taskable_type' => 'project',
            'partner_id' => $project->partners->first()->id ?? 31,
            'milestone_order' => 0,
            'start_date' => Carbon::now(),
            'date_added' => Carbon::now(),
            'repeat_id' => TaskRepeat::CUSTOM,
        ]);

        TaskTimer::create([
            'task_id' => $task->id,
            'start_time' => Carbon::now(),
            'end_time' => Carbon::now()->add(15, 'minutes'),
            'staff_id' => $project->responsiblePerson->id,
        ]);

        if ($project->process) {
            foreach ($project->process->toNotify as $staff) {
                $this->notificationService->sendSlackNotification(
                    staffId: $staff->id,
                    header: 'Nuevo caso: '.$project->name,
                    body: 'Has sido asignado a un nuevo caso',
                    url: "/projects/{$project->id}",
                    modelId: $project->id,
                    modelType: Project::class
                );
                foreach ($staff->devices as $device) {
                    $this->notificationService->sendWebPushNotification(
                        $device->device_token,
                        "Nuevo caso: $project->name",
                        'Has sido asignado a un nuevo caso',
                        $staff->id,
                        strtolower(class_basename(Project::class)),
                        $project->id,
                    );
                }
            }
        }

        return response()->json($project, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project = QueryBuilder::for(Project::class)
            ->allowedIncludes([
                'staffs',
                'billablePartner',
                'billingType',
                'serviceType.processes.forks',
                'files',
                'status',
                'members',
                'responsiblePerson',
                'tasks',
                'proposal',
                'partners.relatedPartners',
                'process',
                'notes.staff',
                'court',
            ])
            ->find($project->id);

        return new ProjectResource($project);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project)
    {
        $data = $request->validated();

        $memberIds = array_map(fn ($member) => $member['id'], $request->get('project_members'));
        $project->members()->sync($memberIds);

        $notes = $request['notes'] ?: [];
        $project->notes()->delete();
        $project->notes()->createMany($notes);

        $partnersToSync = [];
        foreach ($request->get('partners') as $partner) {
            $partnersToSync[$partner['id']] = [
                'role_id' => $partner['role_id'],
                'owner_id' => isset($partner['owner_id']) ? $partner['owner_id'] : null,
            ];
        }
        $project->partners()->sync($partnersToSync);

        $project->update($data);

        $project->setName();

        return response()->json($project, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        Project::destroy($project->id);

        return response()->json(null, 204);
    }

    public function countByStatuses(Request $request)
    {
        $partnerId = $request->input('partner_id');

        $countByStatuses = DB::table('project_statuses')
            ->when(
                $partnerId,
                function ($query, $partnerId) {
                    return $query->selectRaw("label, COUNT(IF(billable_partner_id = $partnerId, 1, NULL)) as count");
                },
                function ($query) {
                    return $query->selectRaw('label, COUNT(project_status_id) as count');
                }
            )

            ->leftJoin('projects', 'projects.project_status_id', '=', 'project_statuses.id')
            ->groupBy('label')
            ->get();

        return response()->json($countByStatuses);
    }

    public function attachTasks(Project $project, Request $request)
    {
        $data = $request->validate([
            'staff_id' => 'required|exists:staff,id',
            'procedure_id' => 'nullable|exists:procedures,id',
        ]);

        $staff = Staff::find($data['staff_id']);

        $process = $project->load('process')->process;

        if (isset($data['procedure_id'])) {
            $startingProcedure = Procedure::find($data['procedure_id']);
        } else {
            $startingProcedure = $process->load('procedures')->procedures->sortBy('step_number')->first();
        }

        $createdTasks = [];
        $startingProcedure->traversePath($project, $staff->id, $createdTasks);

        $created = count($createdTasks) > 0;

        return response()->json(['createdTasks' => $created], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateMembers(ProjectMemberRequest $request, Project $project)
    {
        $request->validated();

        $ids = array_map(fn ($member) => $member['id'], $request->get('project_members'));
        $project->members()->sync($ids);

        return response()->json($project, 201);
    }

    public function lastYearIncomesOutcomes(Project $project)
    {
        $now = Carbon::now();

        // Query to get total expenses for the last 12 months
        $monthlyExpenses = Expense::selectRaw('SUM(amount) as total_amount, MONTH(date) as month, YEAR(date) as year')
            ->where('expenses.project_id', $project->id)
            ->whereBetween('date', [Carbon::now()->subMonths(12), Carbon::now()])
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        $lastTwelveMonths = collect(range(0, 11))->map(function ($i) use ($now) {
            $date = $now->copy()->subMonths(11 - $i);

            return [
                'label' => $date->format('M y'),
                'month' => $date->month,
                'year' => $date->year,
                'total_amount' => 0,
            ];
        });

        $formattedExpenses = $lastTwelveMonths->map(function ($monthData) use ($monthlyExpenses) {
            $expense = $monthlyExpenses->first(function ($e) use ($monthData) {
                return $e->month == $monthData['month'] && $e->year == $monthData['year'];
            });

            // If the expense is found, use its total_amount if not keep the default 0
            return $expense ? $expense->total_amount : 0;
        });

        // TODO:
        // Need to check the logic here because the partial payments needs to be considered in his created_at date
        // Payment (many) -> Invoice (many)
        // Filter for every Invoice on the specific month and year gives the possibility of existence a partial payment on this month
        // But the payment could be created in another month after the invoice and

        $monthlyInvoices = Invoice::where('project_id', $project->id)
        ->whereBetween('date', [$now->copy()->subMonths(12), $now])
        ->orderBy('date', 'asc')
        ->get();

        // Calculate total incomes for each month based on partial payments
        $formattedInvoices = $lastTwelveMonths->map(function ($monthData) use ($monthlyInvoices) {
            $invoicesForMonth = $monthlyInvoices->filter(function ($invoice) use ($monthData) {
                $invoiceMonth = Carbon::parse($invoice->date)->month();
                $invoiceYear = Carbon::parse($invoice->date)->year();

                return $invoiceMonth == Carbon::parse($monthData['month'])->month() && $invoiceYear == Carbon::parse($monthData['year'])->year();
            });

            // Sum the total paid for all invoices in this month
            $totalPaid = $invoicesForMonth->sum(function ($invoice) use ($monthData) {
                // Filter payments for the specific month and year
                $filteredPayments = $invoice->payments->filter(function ($payment) use ($monthData) {
                    // Ensure created_at exists and parse it
                    if (isset($payment->pivot->created_at)) {
                        $createdAt = Carbon::parse($payment->pivot->created_at);

                        return $createdAt->month == $monthData['month'] &&
                               $createdAt->year == $monthData['year'];
                    }

                    return false; // Skip if created_at is not set
                });

                // Return the sum of the amounts from the filtered payments
                return $filteredPayments->sum(function ($payment) {
                    return $payment->pivot->amount ?? 0; // Handle cases where pivot.amount might not be set
                });
            });

            // Update the total amount for this month
            $monthData['total_amount'] = $totalPaid;

            return $monthData;
        });

        return response()->json([
            'outcomes' => $formattedExpenses->values(),
            'incomes' => $formattedInvoices->pluck('total_amount'),
        ]);
    }

    public function getProjectFinancialData(Project $project, Request $request)
    {
        $from = $request->input('from');
        $until = $request->input('until');
        $billed = $project->totalBilledCostPerMonth($from, $until);
        $paid = $project->totalPaidCostPerMonth($from, $until);
        $data = ['paid'=> $paid, 'billed'=>$billed];

        return response()->json($data = $data, 201);
    }
}
