<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskTimerRequest;
use App\Http\Resources\TaskTimerResource;
use App\Http\Resources\TaskTimerResourceCollection;
use App\Models\Staff;
use App\Models\TaskTimer;
use Spatie\QueryBuilder\QueryBuilder;

class TaskTimerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $timers = QueryBuilder::for(TaskTimer::class)->get();

        return new TaskTimerResourceCollection($timers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskTimerRequest $request)
    {
        $newTimer = $request->validated();
        $currentTimer = Staff::find($newTimer['staff_id'])->getCurrentTimer();

        if ($currentTimer) {
            $currentTimer->update(['end_time' => now()]);
        }

        TaskTimer::create($newTimer);

        return response()->json(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(TaskTimer $timer)
    {
        //
    }

    /**
     * Display the specified resource for a specific staff.
     */
    public function getCurrentTimer(Staff $staff)
    {
        $timer = QueryBuilder::for(TaskTimer::class)
            ->allowedIncludes(['task'])
            ->where('staff_id', $staff->id)
            ->whereNull('end_time')
            ->first();

        return $timer ? new TaskTimerResource($timer) : response()->json(null);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskTimerRequest $request, TaskTimer $timer)
    {
        $newTimer = $request->validated();
        $timer->update($newTimer);

        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskTimerRequest $tax)
    {
        //
    }
}
