<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
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
            'amount' => $this->amount,
            'name' => $this->name,
            'note' => $this->note,
            'reference' => $this->reference_no,
            'date' => $this->date,
            'repeat_id' => $this->repeat_id,
            'billable' => $this->billable,
            'tax_id' => $this->tax_id,
            'tax2_id' => $this->tax2_id,
            'recurring_type' => $this->recurring_type,
            'recurring' => $this->recurring,
            'cycles' => $this->cycles,
            'send_invoice_to_customer' => $this->send_invoice_to_customer,
            'create_invoice_billable' => $this->create_invoice_billable,
            'is_infinite' => $this->is_infinite,
            'total_cycles' => $this->total_cycles,
            'createdFromAction' => $this->created_from_action,
            'files' => FileResource::collection($this->whenLoaded('files')),
            'estimate' => EstimateResource::make($this->whenLoaded('estimate')),
            'project' => ProjectResource::make($this->whenLoaded('project')),
            'category' => ExpenseCategoryResource::make($this->whenLoaded('category')),
            'partner' => PartnerResource::make($this->whenLoaded('partner')),
            'task' => TaskResource::make($this->whenLoaded('task')),
            'invoice' => InvoiceResource::make($this->whenLoaded('invoice')),
            'currency' => CurrencyResource::make($this->whenLoaded('currency')),
            'paymentMethod' => PaymentMethodResource::make($this->whenLoaded('paymentMethod')),
        ];
    }
}
