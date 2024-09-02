<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class EstimateProjectSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->leftJoin('projects as projects_order', 'estimates.project_id', '=', 'projects_order.id')
            ->orderByRaw("projects_order.{$property} IS NULL, projects_order.{$property} $direction");
    }
}
