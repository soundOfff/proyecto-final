<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class TaskStatusSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->select('tasks.*')
            ->leftJoin('task_statuses as task_statuses_order', 'tasks.task_status_id', '=', 'task_statuses_order.id')
            ->orderByRaw("task_statuses_order.{$property} IS NULL, task_statuses_order.{$property} {$direction}");
    }
}
