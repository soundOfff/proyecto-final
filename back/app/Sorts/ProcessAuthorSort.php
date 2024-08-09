<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class ProcessAuthorSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->leftJoin('staff as staff_order', 'processes.author_id', '=', 'staff_order.id')
            ->orderByRaw("staff_order.{$property} IS NULL, staff_order.{$property} {$direction}");
    }
}