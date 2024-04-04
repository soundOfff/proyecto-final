<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class ProposablePartnerSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->selectRaw('
                CASE 
                    WHEN partners_order.name IS NOT NULL THEN partners_order.name
                    WHEN partners_order.company IS NOT NULL THEN partners_order.company
                    WHEN partners_order.name IS NULL AND partners_order.company IS NULL THEN NULL
                END as partner_name')
            ->leftJoin('partners as partners_order', 'proposals.proposable_id', '=', 'partners_order.id')
            ->where('proposable_type', 'customer')
            ->orderByRaw("partner_name is null, partner_name {$direction}");
    }
}
