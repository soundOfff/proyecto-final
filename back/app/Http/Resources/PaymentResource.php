<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
            'invoice_id' => $this->invoice_id,
            'payment_method_id' => $this->payment_method_id,
            'amount' => $this->amount,
            'date' => $this->date,
            'date_recorded' => $this->date_recorded,
            'note' => $this->note,
            'payment_mode' => $this->payment_mode,
            'transaction_id' => $this->transaction_id,
            'invoices' => InvoiceResource::collection($this->whenLoaded('invoices')),
            'partner' => PartnerResource::make($this->whenLoaded('partner')),
            'paymentMethod' => PaymentMethodResource::make($this->whenLoaded('paymentMethod')),
            'parcial_amount' => is_null($this->pivot) ? null : $this->pivot->amount,
            'pivot' => $this->pivot,
            'partialTotalPaid' => $this->partial_total_paid,
        ];
    }
}
