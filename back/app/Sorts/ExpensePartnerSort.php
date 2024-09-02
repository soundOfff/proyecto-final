<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class ExpensePartnerSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->selectRaw('IF(partners_order.name IS NOT NULL, partners_order.name, partners_order.company) as partner_name')
            ->leftJoin('partners as partners_order', 'expenses.partner_id', '=', 'partners_order.id')
            ->orderByRaw("partner_name IS NULL, partner_name $direction");
    }
}
