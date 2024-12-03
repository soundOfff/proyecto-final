<?php

namespace App\Http\Controllers;

use App\Filters\IsGenericExpenseFilter;
use App\Http\Requests\ExpenseRequest;
use App\Http\Resources\ExpenseResource;
use App\Http\Resources\ExpenseResourceCollection;
use App\Models\Expense;
use App\Models\ExpenseRepeat;
use App\Models\File;
use App\Sorts\ExpenseCategorySort;
use App\Sorts\ExpenseInvoiceSort;
use App\Sorts\ExpensePartnerSort;
use App\Sorts\ExpenseProjectSort;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;
use Spatie\QueryBuilder\AllowedFilter;
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
                'task',
                'category',
                'project',
                'estimate',
                'files',
                'invoice',
            ])
            ->allowedFilters([
                AllowedFilter::exact('partner_id'),
                AllowedFilter::exact('project_id'),
                AllowedFilter::custom('is_generic', new IsGenericExpenseFilter()),
                AllowedFilter::scope('search'),
                AllowedFilter::callback('not_in_line_item', fn (Builder $query) => $query->whereDoesntHave('lineItems')),
                AllowedFilter::callback('date', function ($query, $values) {
                    $query->whereBetween('date', [$values[0], $values[1]]);
                }),
            ])
            ->defaultSort('-id')
            ->allowedSorts([
                'id', 'name', 'amount', 'date',
                AllowedSort::field('createdFromAction', 'created_from_action'),
                AllowedSort::custom('partner', new ExpensePartnerSort(), 'partner_name'),
                AllowedSort::custom('category.name', new ExpenseCategorySort(), 'name'),
                AllowedSort::custom('project.name', new ExpenseProjectSort(), 'name'),
                AllowedSort::custom('invoice', new ExpenseInvoiceSort(), 'id'),
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

        $expenseFiles = isset($newExpense['files']) ? $newExpense['files'] : [];
        $expenseFilesInfo = isset($newExpense['files_info']) ? $newExpense['files_info'] : [];

        foreach (array_keys($expenseFiles) as $index) {
            $file = $expenseFiles[$index];
            $fileInfo = $expenseFilesInfo[$index];
            $extension = $file->extension();
            if ($expense->project && $expense->partner && $expense->task) {
                $partnerId = $expense->partner->id;
                $projectId = $expense->project->id;
                $taskId = $expense->task->id;
                $path = "/partners/$partnerId/projects/$projectId/tasks/$taskId/expenses/$expense->id/$fileInfo".($extension ? ".$extension" : '');
            } elseif ($expense->project && $expense->partner) {
                $projectId = $expense->project->id;
                $partnerId = $expense->partner->id;
                $path = "partners/$partnerId/projects/$projectId/expenses/$expense->id/$fileInfo".($extension ? ".$extension" : '');
            } elseif ($expense->project && $expense->task) {
                $projectId = $expense->project->id;
                $taskId = $expense->task->id;
                $path = "/projects/$projectId/tasks/$taskId/expenses/$expense->id/$fileInfo".($extension ? ".$extension" : '');
            } elseif ($expense->task && $expense->partner) {
                $taskId = $expense->task->id;
                $partnerId = $expense->partner->id;
                $path = "/partners/$partnerId/tasks/$taskId/expenses/$expense->id/$fileInfo".($extension ? ".$extension" : '');
            } else {
                $path = "/expenses/$expense->id/$fileInfo".($extension ? ".$extension" : '');
            }

            Storage::disk('google')->put($path, file_get_contents($file));
            $data['url'] = Storage::disk('google')->path($path);
            $data['subject'] = $fileInfo;
            $data['fileable_type'] = 'expense';
            $data['fileable_id'] = $expense->id;

            File::create($data);
        }

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
                'estimate',
                'task',
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
    public function update(ExpenseRequest $request, Expense $expense)
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

    public function monthlyExpenses($year)
    {
        $currentYear = $year ?: Carbon::now()->year;

        $monthlyExpenses = Expense::selectRaw('expense_category_id, expense_categories.name as category_name, SUM(amount) as total_amount, MONTH(date) as month')
            ->join('expense_categories', 'expenses.expense_category_id', '=', 'expense_categories.id')
            ->whereYear('date', $currentYear)
            ->groupBy('expense_category_id', 'month', 'expense_categories.name')
            ->orderBy('expense_category_id', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        $yearlyTotals = Expense::selectRaw('expense_category_id, expense_categories.name as category_name, SUM(amount) as yearly_total')
            ->join('expense_categories', 'expenses.expense_category_id', '=', 'expense_categories.id')
            ->whereYear('date', $currentYear)
            ->groupBy('expense_category_id', 'expense_categories.name')
            ->get();

        $months = collect(range(1, 12))->mapWithKeys(function ($month) {
            return [$month => 0];
        });

        $formattedExpenses = $monthlyExpenses->groupBy('expense_category_id')->map(function ($expenses, $category) use ($yearlyTotals, $months) {
            $yearlyTotalData = $yearlyTotals->firstWhere('expense_category_id', $category);
            $yearlyTotal = $yearlyTotalData->yearly_total;
            $categoryName = $yearlyTotalData->category_name;

            $monthly = $months->map(function ($defaultTotal, $month) use ($expenses) {
                $expense = $expenses->firstWhere('month', $month);

                return [
                    'month' => Carbon::createFromDate(null, $month, 1)->format('F'),
                    'total_amount' => $expense ? $expense->total_amount : $defaultTotal,
                ];
            });

            return [
                'category' => $categoryName,
                'monthly' => $monthly->values(),
                'yearly_total' => $yearlyTotal,
            ];
        });

        return response()->json([
            'expenses' => $formattedExpenses,
        ]);
    }
}
