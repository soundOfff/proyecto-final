<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class ExpenseCategorySort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->leftJoin('expense_categories as expense_categories_order', 'expenses.expense_category_id', '=', 'expense_categories_order.id')
            ->orderBy("expense_categories_order.{$property}", $direction);
    }
}
