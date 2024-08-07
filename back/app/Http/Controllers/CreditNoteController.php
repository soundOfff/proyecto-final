<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreditNoteRequest;
use App\Http\Resources\CreditNoteResource;
use App\Http\Resources\CreditNoteResourceCollection;
use App\Models\CreditNote;
use App\Models\CreditNoteStatus;
use App\Models\LineItem;
use App\Models\LineItemTax;
use App\Sorts\CreditNotePartnerSort;
use App\Sorts\CreditNotePendingCreditsSort;
use App\Sorts\CreditNoteProjectSort;
use App\Sorts\CreditNoteStatusSort;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class CreditNoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(CreditNote::class)
            ->allowedIncludes('status', 'partner', 'project', 'credits')
            ->allowedSorts([
                'id',
                'number',
                'date',
                'total',
                AllowedSort::field('expiryDate', 'expiry_date'),
                AllowedSort::field('referenceNo', 'reference_no'),
                AllowedSort::custom('status', new CreditNoteStatusSort(), 'label'),
                AllowedSort::custom('partner', new CreditNotePartnerSort(), 'partner_name'),
                AllowedSort::custom('project', new CreditNoteProjectSort(), 'name'),
                AllowedSort::custom('pendingCredits', new CreditNotePendingCreditsSort()),
            ]);

        $creditNotes = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new CreditNoteResourceCollection($creditNotes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreditNoteRequest $request)
    {
        $newCreditNote = $request->validated();
        $newCreditNote['credit_note_status_id'] = CreditNoteStatus::OPEN;
        $newCreditNote['prefix'] = 'CN-';

        $creditNote = CreditNote::create($newCreditNote);

        $items = $newCreditNote['items'];
        foreach ($items as $item) {
            $item['line_itemable_id'] = $creditNote->id;
            $item['line_itemable_type'] = 'credit_note';
            $itemTaxes = $item['taxes'];
            $lineItem = LineItem::create($item);

            foreach ($itemTaxes as $itemTax) {
                $itemTax['line_item_id'] = $lineItem->id;
                $itemTax['line_item_taxable_id'] = $creditNote->id;
                $itemTax['line_item_taxable_type'] = 'credit_note';
                LineItemTax::create($itemTax);
            }
        }

        return response()->json(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CreditNote $creditNote)
    {
        $creditNote = QueryBuilder::for(CreditNote::class)
        ->allowedIncludes([
            'status',
            'partner',
            'project',
            'credits',
            'billingCountry',
            'shippingCountry',
            'lineItems.taxes',
            'lineItems.type',
        ])
        ->find($creditNote->id);

        return new CreditNoteResource($creditNote);
    }

    public function update(CreditNoteRequest $request, CreditNote $creditNote)
    {
        $updatedCreditNote = $request->validated();
        $creditNote->lineItems->each(function ($item) {
            $item->taxes()->delete();
        });
        $creditNote->lineItems()->delete();
        $items = $updatedCreditNote['items'];

        $creditNote->update($updatedCreditNote);

        foreach ($items as $item) {
            $item['line_itemable_id'] = $creditNote->id;
            $item['line_itemable_type'] = 'credit_note';
            $itemTaxes = $item['taxes'];
            $lineItem = LineItem::create($item);

            foreach ($itemTaxes as $itemTax) {
                $itemTax['line_item_id'] = $lineItem->id;
                $itemTax['line_item_taxable_id'] = $creditNote->id;
                $itemTax['line_item_taxable_type'] = 'credit_note';
                LineItemTax::create($itemTax);
            }
        }

        return response()->json(null, 204);
    }

    public function destroy(CreditNote $creditNote)
    {
        $creditNote->credits()->delete();
        $creditNote->delete();

        return response()->json(null, 204);
    }
}
