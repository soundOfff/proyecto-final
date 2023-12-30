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
            'name' => $this->name,
            'date' => $this->date,
            'project' => ProjectResource::make($this->whenLoaded('project')),
            'category' => ExpenseCategoryResource::make($this->whenLoaded('category')),
            'user' => UserResource::make($this->whenLoaded('user')),
            'invoice' => InvoiceResource::make($this->whenLoaded('invoice')),
            'currency' => CurrencyResource::make($this->whenLoaded('currency')),
            'paymentMethod' => PaymentMethodResource::make($this->whenLoaded('paymentMethod')),
        ];
    }
}
