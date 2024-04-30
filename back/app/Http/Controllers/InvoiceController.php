<?php

namespace App\Http\Controllers;

use App\Filters\InvoiceToPayFilter;
use App\Http\Resources\InvoiceResource;
use App\Http\Resources\InvoiceResourceCollection;
use App\Http\Resources\InvoiceSelectResourceCollection;
use App\Models\Invoice;
use App\Sorts\InvoiceEstimateSort;
use App\Sorts\InvoicePartnerSort;
use App\Sorts\InvoiceProjectServiceTypeSort;
use App\Sorts\InvoiceProjectSort;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class InvoiceController extends Controller
{
    public function select()
    {
        $invoices = Invoice::query()
        ->select('id', 'number')
        ->distinct()
        ->get();

        return new InvoiceSelectResourceCollection($invoices);
    }

    public function index()
    {
        $query = QueryBuilder::for(Invoice::class)
            ->selectRaw('invoices.*')
            ->allowedIncludes([
                'partner',
                'project.serviceType',
                'project.defendant',
                'currency',
                'estimate',
                'billingCountry',
                'shippingCountry',
                'lineItems.taxes',
                'tags',
            ])
            ->allowedFilters([
                'partner_id',
                'project_id',
                AllowedFilter::custom('to_pay', new InvoiceToPayFilter),
            ])
            ->allowedSorts([
                'id', 'total', 'date', 'tags',
                AllowedSort::field('totalTax', 'total_tax'),
                AllowedSort::field('dueDate', 'due_date'),
                AllowedSort::custom('partner', new InvoicePartnerSort(), 'partner_name'),
                AllowedSort::custom('project', new InvoiceProjectSort(), 'name'),
                AllowedSort::custom('estimate', new InvoiceEstimateSort(), 'number'),
                AllowedSort::custom('serviceType', new InvoiceProjectServiceTypeSort(), 'label'),
            ]);

        $invoices = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new InvoiceResourceCollection($invoices);
    }

    public function show(Invoice $invoice)
    {
        $data = QueryBuilder::for(Invoice::class)
            ->allowedIncludes([
                'partner',
                'project.serviceType',
                'project.defendant',
                'currency',
                'estimate',
                'billingCountry',
                'shippingCountry',
                'lineItems.taxes',
                'tags',
            ])
            ->find($invoice->id);

        return new InvoiceResource($data);
    }
}
