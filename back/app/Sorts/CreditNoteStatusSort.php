<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class CreditNoteStatusSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->join('credit_note_statuses as credit_note_statuses_order', 'credit_notes.credit_note_status_id', '=', 'credit_note_statuses_order.id')
            ->orderByRaw("credit_note_statuses_order.{$property} $direction");
    }
}
