<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class TaskPartnerSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->leftJoin('partners as partners_order', 'tasks.partner_id', '=', 'partners_order.id')
            ->orderByRaw("COALESCE(partners_order.company, partners_order.name) $direction");
    }
}
