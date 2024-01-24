<?php

namespace App\Http\Controllers;

use App\Http\Requests\EstimateRequest;
use App\Http\Resources\EstimateResource;
use App\Http\Resources\EstimateResourceCollection;
use App\Models\Estimate;
use App\Models\Invoice;
use App\Models\LineItem;
use App\Models\LineItemTax;
use App\Models\Taggable;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class EstimateController extends Controller
{
    public function toInvoice(Estimate $estimate)
    {
        $estimate->load('lineItems.taxes');
        $newInvoice = $estimate->toArray();
        $newInvoice['prefix'] = 'INVOICE-';
        $newInvoice['estimate_id'] = $estimate->id;
        $newInvoice['show_shipping_on_invoice'] = $estimate->show_shipping_on_estimate;
        $newInvoice['items'] = $estimate->lineItems->toArray();
        $newInvoice['tags'] = $estimate->tags->toArray();
        $newInvoice['number'] = Invoice::getNextNumber();

        $invoice = Invoice::create($newInvoice);
        $estimate->update(['invoice_id' => $invoice->id]);

        foreach ($newInvoice['tags'] as $tag) {
            $tag['taggable_id'] = $invoice->id;
            $tag['taggable_type'] = 'invoice';
            $tag['tag_id'] = $tag['id'];
            Taggable::create($tag);
        }

        foreach ($newInvoice['items'] as $item) {
            $item['line_itemable_id'] = $invoice->id;
            $item['line_itemable_type'] = 'invoice';
            $lineItem = LineItem::create($item);
            dump($lineItem);

            $itemTaxes = $item['taxes'];
            foreach ($itemTaxes as $itemTax) {
                $itemTax['line_item_id'] = $lineItem->id;
                $itemTax['line_item_taxable_id'] = $invoice->id;
                $itemTax['line_item_taxable_type'] = 'invoice';
                LineItemTax::create($itemTax);
            }
        }

        return response()->json($invoice->id, 201);
    }

    public function maxId()
    {
        $maxId = Estimate::max('id');

        return response()->json($maxId);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Estimate::class)
        ->allowedIncludes([
            'partner',
            'project.serviceType',
            'currency',
            'invoice',
            'billingCountry',
            'shippingCountry',
            'tags',
        ])
        ->orderBy('id', 'desc');

        $estimates = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new EstimateResourceCollection($estimates);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EstimateRequest $request)
    {
        $newEstimate = $request->validated();
        $items = $newEstimate['items'];
        $tags = $newEstimate['tags'];

        $estimate = Estimate::create($newEstimate);

        foreach ($tags as $tag) {
            $tag['taggable_id'] = $estimate->id;
            $tag['taggable_type'] = 'estimate';
            $tag['tag_id'] = $tag['id'];
            Taggable::create($tag);
        }

        foreach ($items as $item) {
            $item['line_itemable_id'] = $estimate->id;
            $item['line_itemable_type'] = 'estimate';
            $itemTaxes = $item['taxes'];
            $lineItem = LineItem::create($item);

            foreach ($itemTaxes as $itemTax) {
                $itemTax['line_item_id'] = $lineItem->id;
                $itemTax['line_item_taxable_id'] = $estimate->id;
                $itemTax['line_item_taxable_type'] = 'estimate';
                LineItemTax::create($itemTax);
            }
        }

        return response()->json(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Estimate $estimate)
    {
        $estimate = QueryBuilder::for(Estimate::class)
            ->allowedIncludes([
                'partner',
                'project.serviceType',
                'currency',
                'invoice',
                'billingCountry',
                'shippingCountry',
                'tags',
                'lineItems.taxes',
            ])
            ->find($estimate->id);

        return new EstimateResource($estimate);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Estimate $estimate)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estimate $estimate)
    {
        //
    }
}
