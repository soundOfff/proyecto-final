<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class TaskPrioritySort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->leftJoin('task_priorities as task_priorities_order', 'tasks.task_priority_id', '=', 'task_priorities_order.id')
            ->orderByRaw("task_priorities_order.{$property} IS NULL, task_priorities_order.{$property} {$direction}");
    }
}
