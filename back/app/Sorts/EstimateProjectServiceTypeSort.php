<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class EstimateProjectServiceTypeSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->leftJoin('projects as project_order', 'estimates.project_id', '=', 'project_order.id')
            ->leftJoin('project_service_types as type_order', 'project_order.project_service_type_id', '=', 'type_order.id')
            ->orderByRaw("type_order.$property IS NULL, type_order.$property $direction");
    }
}
