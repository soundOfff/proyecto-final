<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\ProjectServiceTypeResourceCollection;
use App\Models\Project;
use App\Models\ProjectServiceType;
use Illuminate\Http\Request;

class ProjectServiceTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $serviceTypes = ProjectServiceType::all();

        return new ProjectServiceTypeResourceCollection($serviceTypes);
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
    public function show(Project $project)
    {
        //
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
        //
    }
}
