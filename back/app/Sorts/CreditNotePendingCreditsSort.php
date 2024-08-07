<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class CreditNotePendingCreditsSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $creditsByCreditNote = $query->selectRaw('credit_notes.id as credit_note_id, total - sum(credits_sort.amount) as pending_credits')
            ->join('credits as credits_sort', 'credit_notes.id', '=', 'credits_sort.credit_note_id')
            ->groupBy('credit_notes.id');

        $query
            ->leftJoinSub($creditsByCreditNote, 'credits_by_credit_note', function ($join) {
                $join->on('credit_notes.id', '=', 'credits_by_credit_note.credit_note_id');
            })
            ->addSelect('credit_notes.*')
            ->orderByRaw("credits_by_credit_note.pending_credits $direction");
    }
}
