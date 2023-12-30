<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentMethodResource extends JsonResource
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
            'name' => $this->name,
            'label' => $this->label,
            'description' => $this->description,
            'showOnPdf' => $this->show_on_pdf,
            'invoicesOnly' => $this->invoices_only,
            'expensesOnly' => $this->expenses_only,
            'selectedByDefault' => $this->selected_by_default,
            'active' => $this->active,
        ];
    }
}
