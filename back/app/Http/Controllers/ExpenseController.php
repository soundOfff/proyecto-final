<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExpenseRequest;
use App\Http\Resources\ExpenseResource;
use App\Http\Resources\ExpenseResourceCollection;
use App\Models\Expense;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Expense::class)
        ->allowedIncludes([
            'user.partners',
            'category',
            'project',
            'invoice',
        ])
        ->orderBy('id', 'desc');

        $expense = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new ExpenseResourceCollection($expense);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ExpenseRequest $request)
    {
        $newExpense = $request->validated();

        $expense = Expense::create($newExpense);

        return response()->json($expense, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        $expense = QueryBuilder::for(Expense::class)
        ->allowedIncludes([
            'user.partners',
            'category',
            'project',
            'invoice',
        ])
        ->find($expense->id);

    return new ExpenseResource($expense);
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
