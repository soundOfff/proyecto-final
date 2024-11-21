<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectMemberRequest;
use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ProjectResourceCollection;
use App\Http\Resources\ProjectSelectResourceCollection;
use App\Models\Partner;
use App\Models\Procedure;
use App\Models\Process;
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
        $staff = Staff::find($request->get('staff_id'));
        $startingProcedure = Procedure::find($request->get('procedure_id'));

        abort_if(! $staff, 404, 'Staff not found');

        $process = $project->load('process')->process;

        if (is_null($startingProcedure)) {
            // If no procedure is selected, get the root
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
}
