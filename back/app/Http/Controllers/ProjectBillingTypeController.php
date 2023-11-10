<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectBillingTypeResourceCollection;
use App\Models\Project;
use App\Models\ProjectBillingType;
use Illuminate\Http\Request;

class ProjectBillingTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $serviceTypes = ProjectBillingType::all();

        return new ProjectBillingTypeResourceCollection($serviceTypes);
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
