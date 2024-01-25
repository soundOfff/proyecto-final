<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Http\Resources\InvoiceResourceCollection;
use App\Http\Resources\InvoiceSelectResourceCollection;
use App\Models\Invoice;
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
            ->allowedIncludes([
                'partner',
                'project.serviceType',
                'currency',
                'estimate',
                'billingCountry',
                'shippingCountry',
                'lineItems.taxes',
                'tags',
            ])
            ->orderBy('id', 'desc');

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
