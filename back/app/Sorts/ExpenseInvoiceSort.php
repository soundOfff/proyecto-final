<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class ExpenseInvoiceSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->leftJoin('invoices as invoices_order', 'expenses.invoice_id', '=', 'invoices_order.id')
            ->orderByRaw("invoices_order.{$property} IS NULL, invoices_order.{$property} {$direction}");
    }
}
