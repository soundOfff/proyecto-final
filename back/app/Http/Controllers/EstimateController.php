<?php

namespace App\Http\Controllers;

use App\Http\Requests\EstimateRequest;
use App\Http\Resources\EstimateResource;
use App\Http\Resources\EstimateResourceCollection;
use App\Models\Estimate;
use App\Models\Expense;
use App\Models\Invoice;
use App\Models\InvoiceStatus;
use App\Models\LineItem;
use App\Models\LineItemTax;
use App\Models\Taggable;
use App\Sorts\EstimatePartnerSort;
use App\Sorts\EstimateProjectServiceTypeSort;
use App\Sorts\EstimateProjectSort;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class EstimateController extends Controller
{
    public function toInvoice(Estimate $estimate)
    {
        $estimate->load('lineItems.taxes', 'expenses');

        $newInvoice = $estimate->toArray();
        $newInvoice['prefix'] = 'INVOICE-';
        $newInvoice['include_shipping'] = false;
        $newInvoice['invoice_status_id'] = InvoiceStatus::TO_PAY;
        $newInvoice['estimate_id'] = $estimate->id;
        $newInvoice['show_shipping_on_invoice'] = $estimate->show_shipping_on_estimate;
        $newInvoice['items'] = $estimate->lineItems->toArray();
        $newInvoice['tags'] = $estimate->tags->toArray();
        $newInvoice['number'] = Invoice::getNextNumber();

        $invoice = Invoice::create($newInvoice);

        $estimate->update(['invoice_id' => $invoice->id]);

        foreach ($estimate->expenses as $expense) {
            $expense->update(['invoice_id' => $invoice->id]);
        }

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
        ->selectRaw('estimates.*')
        ->allowedIncludes([
            'partner',
            'project.serviceType',
            'currency',
            'invoice',
            'billingCountry',
            'shippingCountry',
            'tags',
        ])
        ->allowedSorts([
            'id', 'total', 'date',
            AllowedSort::field('totalTax', 'total_tax'),
            AllowedSort::field('expiryDate', 'expiry_date'),
            AllowedSort::field('referenceNo', 'reference_no'),
            AllowedSort::custom('partner', new EstimatePartnerSort(), 'partner_name'),
            AllowedSort::custom('project', new EstimateProjectSort(), 'name'),
            AllowedSort::custom('serviceType', new EstimateProjectServiceTypeSort(), 'label'),
        ])
        ->allowedFilters([
            AllowedFilter::exact('partner_id'),
            AllowedFilter::exact('project_id'),
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
        $expenses = $newEstimate['expenses'];

        $estimate = Estimate::create($newEstimate);

        $estimate->project->project_service_type_id = $newEstimate['service_id'];
        $estimate->project->save();

        foreach ($expenses as $expenseId) {
            $expense = Expense::find($expenseId);
            if ($expense) {
                $expense->update(['estimate_id' => $estimate->id]);
            }
        }

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
                'lineItems.type',
                'status',
                'subServiceType',
                'discountType',
                'saleAgent',
                'recurring',
            ])
            ->find($estimate->id);

        return new EstimateResource($estimate);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EstimateRequest $request, Estimate $estimate)
    {
        $updatedEstimate = $request->validated();
        $estimate->lineItems->each(function ($item) {
            $item->taxes()->delete();
        });
        $estimate->lineItems()->delete();
        $estimate->tags()->detach();
        $items = $updatedEstimate['items'];
        $tags = $updatedEstimate['tags'];

        $estimate->update($updatedEstimate);

        $estimate->project->project_service_type_id = $updatedEstimate['service_id'];
        $estimate->project->save();

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

        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estimate $estimate)
    {
        $estimate->lineItems->each(function ($item) {
            $item->taxes()->delete();
        });
        $estimate->lineItems()->delete();
        $estimate->tags()->detach();
        $estimate->delete();

        return response()->json(null, 204);
    }
}
