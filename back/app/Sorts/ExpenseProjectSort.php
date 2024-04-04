<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class ExpenseProjectSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->leftJoin('projects as projects_order', 'expenses.project_id', '=', 'projects_order.id')
            ->orderBy("projects_order.{$property}", $direction);
    }
}
