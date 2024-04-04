<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class InvoiceEstimateSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->leftJoin('estimates as estimate_order', 'invoices.estimate_id', '=', 'estimate_order.id')
            ->orderByRaw("estimate_order.{$property} IS NULL, estimate_order.{$property} $direction");
    }
}
