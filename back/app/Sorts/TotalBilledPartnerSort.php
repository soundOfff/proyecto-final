<?php

namespace App\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class TotalBilledPartnerSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';

        $query
            ->selectRaw('partners.id, IF(partners.name IS NOT NULL, partners.name, partners.company) as company , (COALESCE(SUM(invoices.total), 0) -  COALESCE(SUM(payment_invoice.amount), 0)) as totalBilledCost')

            ->leftJoin('projects', 'projects.billable_partner_id', '=', 'partners.id')
            ->leftJoin('invoices', 'invoices.project_id', '=', 'projects.id')
            ->leftJoin('payment_invoice', 'payment_invoice.invoice_id', '=', 'invoices.id')
            ->groupBy('partners.id')
            ->orderByRaw("totalBilledCost $direction");
    }
}
