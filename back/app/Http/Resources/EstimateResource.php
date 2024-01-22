<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EstimateResource extends JsonResource
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
            'sent' => $this->sent,
            'dateSend' => $this->date_send,
            'deletedCustomerName' => $this->deleted_customer_name,
            'number' => $this->number,
            'prefix' => $this->prefix,
            'numberFormat' => $this->number_format,
            'hash' => $this->hash,
            'date' => $this->date,
            'expiryDate' => $this->expiry_date,
            'subtotal' => $this->subtotal,
            'totalTax' => $this->total_tax,
            'total' => $this->total,
            'adjustment' => $this->adjustment,
            'addedFrom' => $this->added_from,
            'status' => $this->status,
            'clientNote' => $this->client_note,
            'adminNote' => $this->admin_note,
            'discountPercent' => $this->discount_percent,
            'discountTotal' => $this->discount_total,
            'discountType' => $this->discount_type,
            'invoicedDate' => $this->invoiced_date,
            'terms' => $this->terms,
            'referenceNo' => $this->reference_no,
            'saleAgent' => $this->sale_agent,
            'billingStreet' => $this->billing_street,
            'billingCity' => $this->billing_city,
            'billingState' => $this->billing_state,
            'billingZip' => $this->billing_zip,
            'shippingStreet' => $this->shipping_street,
            'shippingCity' => $this->shipping_city,
            'shippingState' => $this->shipping_state,
            'shippingZip' => $this->shipping_zip,
            'shippingCountry' => $this->shipping_country,
            'includeShipping' => $this->include_shipping,
            'showShippingOnEstimate' => $this->show_shipping_on_estimate,
            'showQuantityAs' => $this->show_quantity_as,
            'pipelineOrder' => $this->pipeline_order,
            'isExpiryNotified' => $this->is_expiry_notified,
            'acceptanceFirstname' => $this->acceptance_firstname,
            'acceptanceLastname' => $this->acceptance_lastname,
            'acceptanceEmail' => $this->acceptance_email,
            'acceptanceDate' => $this->acceptance_date,
            'acceptanceIp' => $this->acceptance_ip,
            'signature' => $this->signature,
            'cancelOverdueReminders' => $this->cancel_overdue_reminders,
            'recurring' => $this->recurring,
            'partner' => PartnerResource::make($this->whenLoaded('partner')),
            'currency' => CurrencyResource::make($this->whenLoaded('currency')),
            'project' => ProjectResource::make($this->whenLoaded('project')),
            'invoice' => InvoiceResource::make($this->whenLoaded('invoice')),
            'billingCountry' => CountryResource::make($this->whenLoaded('billingCountry')),
            'shippingCountry' => CountryResource::make($this->whenLoaded('shippingCountry')),
            'items' => LineItemResource::collection($this->whenLoaded('lineItems')),
        ];
    }
}
