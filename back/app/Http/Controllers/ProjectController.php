<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectMemberRequest;
use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ProjectResourceCollection;
use App\Http\Resources\ProjectSelectResourceCollection;
use App\Models\Partner;
use App\Models\Process;
use App\Models\Project;
use App\Models\ProjectServiceType;
use App\Models\Task;
use App\Models\TaskRepeat;
use App\Models\TaskTimer;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProjectController extends Controller
{
    public function select(Partner $defendant)
    {
        $projects = Project::where('defendant_id', $defendant->id)
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
                AllowedFilter::exact('defendant_id'),
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
                'defendant',
                'plaintiff',
                'responsiblePerson',
                'files',
                'lawFirm',
                'members',
                'staffs',
                'partners',
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

        $partnersToAttach = [];
        foreach ($request->get('partners') as $partner) {
            $partnersToAttach[$partner['id']] = ['role' => $partner['role']];
        }

        $defendantName = Partner::find($newProject['defendant_id'])->merged_name;
        $plaintiff = Partner::find($newProject['plaintiff_id']);
        $plaintiffName = $plaintiff ? $plaintiff->merged_name : '';
        $serviceType = ProjectServiceType::find($newProject['project_service_type_id']);
        $serviceTypeName = $serviceType ? $serviceType->label : '';

        $newProject['name'] = "$serviceTypeName | $plaintiffName vs $defendantName";

        $project = Project::create($newProject);

        $project->members()->attach($projectMemberIds);
        $project->partners()->attach($partnersToAttach);

        $task = Task::create([
            'name' => 'Data entry',
            'hourly_rate' => 0.25,
            'task_priority_id' => 2,
            'task_status_id' => 1,
            'owner_id' => $project->responsiblePerson->id,
            'taskable_id' => $project->id,
            'taskable_type' => 'project',
            'partner_id' => $project->defendant_id,
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
                'defendant',
                'plaintiff',
                'billingType',
                'serviceType.processes.forks',
                'files',
                'status',
                'members',
                'responsiblePerson',
                'tasks',
                'partners',
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

        $partnersToSync = [];
        foreach ($request->get('partners') as $partner) {
            $partnersToSync[$partner['id']] = ['role' => $partner['role']];
        }
        $project->partners()->sync($partnersToSync);

        $defendantName = Partner::find($data['defendant_id'])->merged_name;
        $plaintiff = Partner::find($data['plaintiff_id']);
        $plaintiffName = $plaintiff ? $plaintiff->merged_name : '';
        $serviceType = ProjectServiceType::find($data['project_service_type_id']);
        $serviceTypeName = $serviceType ? $serviceType->label : '';

        $data['name'] = "$serviceTypeName | $plaintiffName vs $defendantName";

        $project->update($data);

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
            ->when($partnerId, function ($query, $partnerId) {
                return $query->selectRaw("label, COUNT(IF(defendant_id = $partnerId, 1, NULL)) as count");
            },
                function ($query) {
                    return $query->selectRaw('label, COUNT(project_status_id) as count');
                })

            ->leftJoin('projects', 'projects.project_status_id', '=', 'project_statuses.id')
            ->groupBy('label')
            ->get();

        return response()->json($countByStatuses);
    }

    public function attachTasks(Project $project, Request $request)
    {
        $process = Process::find($request->get('processId')); // != null means that is from a child process

        if (is_null($process)) { // == null means that is from a root process
            $process = $project->load('serviceType.processes')->serviceType->processes->first();
        }

        $procedures = $process->load('procedures')->procedures->sortBy('step_number');

        foreach ($procedures as $procedure) {
            $procedure->convertToTask($project);
        }

        return response()->json($project->tasks, 201);
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
