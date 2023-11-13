<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectNoteRequest;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\ProjectNote;
use Illuminate\Http\Request;

class ProjectNoteController extends Controller
{
    public function attach(Project $project, ProjectNoteRequest $request)
    {
        ProjectNote::create($request->validated())->project()->associate($project);

        return response()->json(null, 201);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
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
