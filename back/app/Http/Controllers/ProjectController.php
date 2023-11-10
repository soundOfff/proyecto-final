<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ProjectResourceCollection;
use App\Models\Project;
use App\Models\ProjectMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Project::class)
            ->allowedFilters([
                AllowedFilter::exact('status', 'status.id'),
                AllowedFilter::scope('search'),
            ])
            ->allowedIncludes([
                'stages',
                'notes',
                'status',
                'jurisdiction',
                'defendant',
                'plaintiff',
                'responsiblePerson',
                'lawFirm',
                'staffs',
            ]);

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
        $ids = $newProject['project_member_ids'];

        $project = Project::create($newProject);

        foreach ($ids as $id) {
            ProjectMember::create(['staff_id' => $id, 'project_id' => $project->id]);
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
            ])
            ->find($project->id);

        return new ProjectResource($project);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        Project::destroy($project->id);

        return response()->json(null, 204);
    }

    public function countByStatuses()
    {
        $countByStatuses = DB::table('project_statuses')
            ->selectRaw('label, count(projects.project_status_id) as count')
            ->leftJoin('projects', 'projects.project_status_id', '=', 'project_statuses.id')
            ->groupBy('label', 'project_statuses.id')
            ->get();

        return response()->json($countByStatuses);
    }
}
