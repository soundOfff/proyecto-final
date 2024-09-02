<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CreditNoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'partnerId' => $this->partner_id,
            'currencyId' => $this->currency_id,
            'creditNoteStatusId' => $this->credit_note_status_id,
            'projectId' => $this->project_id,
            'discountTypeId' => $this->discount_type_id,
            'number' => $this->number,
            'prefix' => $this->prefix,
            'numberFormat' => $this->number_format,
            'date' => $this->date,
            'adminNote' => $this->admin_note,
            'clientNote' => $this->client_note,
            'subtotal' => $this->subtotal,
            'totalTax' => $this->total_tax,
            'total' => $this->total,
            'adjustment' => $this->adjustment,
            'addedFrom' => $this->added_from,
            'discountPercent' => $this->discount_percent,
            'discountTotal' => $this->discount_total,
            'deletedCustomerName' => $this->delete_customer_name,
            'referenceNo' => $this->reference_no,
            'billingStreet' => $this->billing_street,
            'billingCity' => $this->billing_city,
            'billingState' => $this->billing_state,
            'billingZip' => $this->billing_zip,
            'shippingStreet' => $this->shipping_street,
            'shippingCity' => $this->shipping_city,
            'shippingState' => $this->shipping_state,
            'shippingZip' => $this->shipping_zip,
            'includeShipping' => $this->include_shipping,
            'showShippingOnCreditNote' => $this->show_shipping_on_credit_note,
            'showQuantityAs' => $this->show_quantity_as,
            'terms' => $this->terms,
            'pendingCredits' => $this->pending_credits,
            'credits' => CreditResource::collection($this->whenLoaded('credits')),
            'partner' => PartnerResource::make($this->whenLoaded('partner')),
            'currency' => CurrencyResource::make($this->whenLoaded('currency')),
            'project' => ProjectResource::make($this->whenLoaded('project')),
            'status' => CreditNoteStatusResource::make($this->whenLoaded('status')),
            'billingCountry' => CountryResource::make($this->whenLoaded('billingCountry')),
            'shippingCountry' => CountryResource::make($this->whenLoaded('shippingCountry')),
            'discountType' => DiscountTypeResource::make($this->whenLoaded('discountType')),
            'items' => LineItemResource::collection($this->whenLoaded('lineItems')),
        ];
    }
}
