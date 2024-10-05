<?php

namespace App\Filters;

use App\Models\InvoiceStatus;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class InvoiceToPayFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query
            ->where('invoice_status_id', InvoiceStatus::TO_PAY)
            ->orWhere('invoice_status_id', InvoiceStatus::PARTIALLY_PAID);
    }
}
