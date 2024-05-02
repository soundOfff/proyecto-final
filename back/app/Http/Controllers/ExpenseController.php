<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExpenseRequest;
use App\Http\Resources\ExpenseResource;
use App\Http\Resources\ExpenseResourceCollection;
use App\Models\Expense;
use App\Models\ExpenseRepeat;
use App\Sorts\ExpenseCategorySort;
use App\Sorts\ExpenseInvoiceSort;
use App\Sorts\ExpensePartnerSort;
use App\Sorts\ExpenseProjectSort;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Expense::class)
        ->selectRaw('expenses.*')
        ->allowedIncludes([
            'partner',
            'category',
            'project',
            'files',
            'invoice',
        ])
        ->allowedFilters(['partner_id', 'project_id'])
        ->defaultSort('-id')
        ->allowedSorts([
            'id', 'name', 'amount', 'date',
            AllowedSort::custom('partner', new ExpensePartnerSort(), 'partner_name'),
            AllowedSort::custom('category.name', new ExpenseCategorySort(), 'name'),
            AllowedSort::custom('project.name', new ExpenseProjectSort(), 'name'),
            AllowedSort::custom('invoice.id', new ExpenseInvoiceSort(), 'id'),
        ]);

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

        if (ExpenseRepeat::isCustom($request['recurring_type'])) {
            $expense->recurring_type = $request['recurring_type'];
            $expense->custom_recurring = $request['recurring'] * Expense::CUSTOM_RECURRING_TYPES[$request['recurring_type']];
            $expense->save();
        }

        return response()->json($expense, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        $expense = QueryBuilder::for(Expense::class)
        ->allowedIncludes([
            'partner',
            'category',
            'files',
            'project',
            'invoice',
            'paymentMethod',
            'currency',
        ])
        ->find($expense->id);

        return new ExpenseResource($expense);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        $updatedExpense = $request->validated();
        $expense->update($updatedExpense);

        return response()->json($expense, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        $expense->delete();

        return response()->json(null, 204);
    }
}
