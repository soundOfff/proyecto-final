<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class ProcessProjectServiceTypeSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->leftJoin('project_service_types as project_service_types_order', 'processes.project_service_type_id', '=', 'project_service_types_order.id')
            ->orderByRaw("project_service_types_order.{$property} IS NULL, project_service_types_order.{$property} {$direction}");
    }
}
