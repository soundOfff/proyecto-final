<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskRepeatResourceCollection;
use App\Models\Expense;
use App\Models\TaskRepeat;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class TaskRepeatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $taskRepeats = QueryBuilder::for(TaskRepeat::class)->get();

        return new TaskRepeatResourceCollection($taskRepeats);
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
    public function show(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $partner)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $partner)
    {
        //
    }
}
