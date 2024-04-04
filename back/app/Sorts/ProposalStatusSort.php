<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class ProposalStatusSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->join('proposal_statuses as status_order', 'proposals.proposal_status_id', '=', 'status_order.id')
            ->orderBy("status_order.$property", $direction);
    }
}
