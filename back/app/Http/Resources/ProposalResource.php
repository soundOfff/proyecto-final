<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProposalResource extends JsonResource
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
            'estimateId' => $this->estimate_id,
            'invoiceId' => $this->invoice_id,
            'currencyId' => $this->currency_id,
            'countryId' => $this->country_id,
            'proposableId' => $this->proposable_id,
            'proposableType' => $this->proposable_type,
            'acceptanceDate' => $this->acceptance_date,
            'acceptanceEmail' => $this->acceptance_email,
            'acceptanceFirstName' => $this->acceptance_first_name,
            'acceptanceLastName' => $this->acceptance_last_name,
            'acceptanceIp' => $this->acceptance_ip,
            'addedFrom' => $this->added_from,
            'address' => $this->address,
            'adjustment' => $this->adjustment,
            'allowComments' => $this->allow_comments,
            'assigned' => $this->assigned,
            'city' => $this->city,
            'content' => $this->content,
            'date' => $this->date,
            'dateConverted' => $this->date_converted,
            'dateSend' => $this->date_send,
            'discountPercent' => $this->discount_percent,
            'discountTotal' => $this->discount_total,
            'discountType' => $this->discount_type,
            'email' => $this->email,
            'hash' => $this->hash,
            'isExpiryNotified' => $this->is_expiry_notified,
            'openTill' => $this->open_till,
            'phone' => $this->phone,
            'pipelineOrder' => $this->pipeline_order,
            'proposalTo' => $this->proposal_to,
            'showQuantityAs' => $this->show_quantity_as,
            'signature' => $this->signature,
            'state' => $this->state,
            'subject' => $this->subject,
            'subtotal' => $this->subtotal,
            'total' => $this->total,
            'totalTax' => $this->total_tax,
            'zip' => $this->zip,
            'createdAt' => Carbon::parse($this->created_at)->format('d/m/Y g:i A'),
            'staffAssigned' => StaffResource::make($this->whenLoaded('staffAssigned')),
            'currency' => CurrencyResource::make($this->whenLoaded('currency')),
            'invoice' => InvoiceResource::make($this->whenLoaded('invoice')),
            'status' => ProposalStatusResource::make($this->whenLoaded('status')),
            'country' => CountryResource::make($this->whenLoaded('billingCountry')),
            'discountType' => DiscountTypeResource::make($this->whenLoaded('discountType')),
            'items' => LineItemResource::collection($this->whenLoaded('lineItems')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'comments' => ProposalCommentResource::collection($this->whenLoaded('comments')),
            'proposable' => $this->whenLoaded('proposable', function () {
                return $this->proposable_type === 'customer'
                    ? PartnerResource::make($this->proposable)
                    : null;
            }),
        ];
    }
}
