<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CreditResource extends JsonResource
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
            'invoiceId' => $this->invoice_id,
            'creditNoteId' => $this->credit_note_id,
            'staffId' => $this->staff_id,
            'amount' => $this->amount,
            'date' => $this->date,
            'dateApplied' => $this->date_applied,
            'invoice' => InvoiceResource::make($this->whenLoaded('invoice')),
            'creditNote' => CreditNoteResource::make($this->whenLoaded('creditNote')),
            'staff' => StaffResource::make($this->whenLoaded('staff')),
        ];
    }
}
