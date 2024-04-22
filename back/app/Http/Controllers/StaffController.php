<?php

namespace App\Http\Controllers;

use App\Http\Resources\StaffResource;
use App\Http\Resources\StaffResourceCollection;
use App\Http\Resources\StaffSelectResourceCollection;
use App\Models\Project;
use App\Models\Staff;
use App\Models\Task;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class StaffController extends Controller
{
    public function select()
    {
        $staffs = Staff::where('active', true)->get();

        return new StaffSelectResourceCollection($staffs);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $staffs = Staff::all();

        return new StaffResourceCollection($staffs);
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
    public function show(string $email)
    {
        $staff = QueryBuilder::for(Staff::class)
            ->allowedIncludes('projects')
            ->where('email', $email)
            ->first();

        return new StaffResource($staff);
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
