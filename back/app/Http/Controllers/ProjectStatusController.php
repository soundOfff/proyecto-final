<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectStatusResource;
use App\Http\Resources\ProjectStatusResourceCollection;
use App\Models\ProjectStatus;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ProjectStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(ProjectStatus::class);

        $statuses = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new ProjectStatusResourceCollection($statuses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProjectStatus $projectStatus)
    {
        $status = QueryBuilder::for(ProjectStatus::class)->find($projectStatus->id);

        return new ProjectStatusResource($status);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProjectStatus $projectStatus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProjectStatus $projectStatus)
    {
        //
    }
}
