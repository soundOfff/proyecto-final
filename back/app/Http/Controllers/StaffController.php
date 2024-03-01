<?php

namespace App\Http\Controllers;

use App\Http\Resources\StaffResourceCollection;
use App\Http\Resources\StaffSelectResourceCollection;
use App\Models\Project;
use App\Models\Staff;
use App\Models\Task;
use Illuminate\Http\Request;

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
    public function show(Project $project)
    {
        //
    }

    public function stats(Staff $staff) {
        $weeklyStart = now()->startOfWeek();
        $weeklyEnd = now()->endOfWeek();
        $monthlyStart = now()->startOfMonth();
        $monthlyEnd = now()->endOfMonth();

        $totalTime = $staff->tasks->sum(fn ($task) => $task->getTotalTime());

        $totalWeekTime = $staff->tasks
            ->sum(fn ($task) => $task->getTotalTime($weeklyStart, $weeklyEnd));

        $totalMonthTime = $staff->tasks
            ->sum(fn ($task) => $task->getTotalTime($monthlyStart, $monthlyEnd));

        return response()->json([
            'total_time' => $totalTime,
            'total_week_time' => $totalWeekTime,
            'total_month_time' => $totalMonthTime,
        ], 200);
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
