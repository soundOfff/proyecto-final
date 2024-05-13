<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectMemberRequest;
use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ProjectResourceCollection;
use App\Http\Resources\ProjectSelectResourceCollection;
use App\Models\Partner;
use App\Models\Project;
use App\Models\ProjectServiceType;
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
                'defendant',
                'plaintiff',
                'responsiblePerson',
                'files',
                'lawFirm',
                'members',
                'staffs',
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
        $ids = $newProject['project_members'];

        $defendantName = Partner::find($newProject['defendant_id'])->merged_name;
        $plaintiff = Partner::find($newProject['plaintiff_id']);
        $plaintiffName = $plaintiff ? $plaintiff->merged_name : '';
        $serviceType = ProjectServiceType::find($newProject['project_service_type_id']);
        $serviceTypeName = $serviceType ? $serviceType->label : '';

        $newProject['name'] = "$serviceTypeName | $defendantName vs $plaintiffName";

        $project = Project::create($newProject);

        $project->members()->attach($ids);

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
                'files',
                'serviceType',
                'status',
                'members',
                'responsiblePerson',
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

        $ids = array_map(fn ($member) => $member['id'], $request->get('project_members'));
        $project->members()->sync($ids);

        $defendantName = Partner::find($data['defendant_id'])->merged_name;
        $plaintiff = Partner::find($data['plaintiff_id']);
        $plaintiffName = $plaintiff ? $plaintiff->merged_name : '';
        $serviceType = ProjectServiceType::find($data['project_service_type_id']);
        $serviceTypeName = $serviceType ? $serviceType->label : '';

        $data['name'] = "$serviceTypeName | $defendantName vs $plaintiffName";

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

    public function attachTasks(Project $project)
    {
        $process = $project->process()->first();
        $procedures = $process->procedures()->get();

        foreach ($procedures as $procedure) {
            $procedure->convertToTask($project->id, $project->defendant_id, $project->responsible_person_id);
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
