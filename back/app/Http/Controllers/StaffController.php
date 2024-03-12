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

    public function stats(Staff $staff)
    {
        $dayStart = now()->startOfDay();
        $dayEnd = now()->endOfDay();

        $weeklyStart = now()->startOfWeek();
        $weeklyEnd = now()->endOfWeek();
        $monthlyStart = now()->startOfMonth();
        $monthlyEnd = now()->endOfMonth();

        $lastWeeklyStart = now()->subWeek()->startOfWeek();
        $lastWeeklyEnd = now()->subWeek()->endOfWeek();
        $lastMonthlyStart = now()->subMonth()->startOfMonth();
        $lastMonthlyEnd = now()->subMonth()->endOfMonth();
        
        $tasks = $staff->tasks;

        $totalTime = $tasks->sum(fn ($task) => $task->getTotalTime());

        $totalDayTime = $tasks
            ->sum(fn ($task) => $task->getTotalTime($dayStart, $dayEnd));

        $totalWeekTime = $tasks
            ->sum(fn ($task) => $task->getTotalTime($weeklyStart, $weeklyEnd));
        
        $totalLastWeekTime = $tasks
            ->sum(fn ($task) => $task->getTotalTime($lastWeeklyStart, $lastWeeklyEnd));

        $totalMonthTime = $tasks
            ->sum(fn ($task) => $task->getTotalTime($monthlyStart, $monthlyEnd));

        $totalLastMonthTime = $tasks
            ->sum(fn ($task) => $task->getTotalTime($lastMonthlyStart, $lastMonthlyEnd));

        $monthlyPercentage = $totalLastMonthTime
            ? (($totalMonthTime - $totalLastMonthTime) / $totalLastMonthTime) * 100
            : $totalMonthTime;
        
        $weeklyPercentage = $totalLastWeekTime
            ? (($totalWeekTime - $totalLastWeekTime) / $totalLastWeekTime) * 100
            : $totalWeekTime;

        return response()->json([
            'total_time' => $totalTime,
            'total_week_time' => $totalWeekTime,
            'total_month_time' => $totalMonthTime,
            'total_day_time' => $totalDayTime,
            'monthly_percentage' => $monthlyPercentage,
            'weekly_percentage' => $weeklyPercentage,
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
