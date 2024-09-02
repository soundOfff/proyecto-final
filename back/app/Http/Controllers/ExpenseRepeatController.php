<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExpenseRepeatResourceCollection;
use App\Models\Expense;
use App\Models\ExpenseRepeat;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ExpenseRepeatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenseRepeat = QueryBuilder::for(ExpenseRepeat::class)->get();

        return new ExpenseRepeatResourceCollection($expenseRepeat);
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
