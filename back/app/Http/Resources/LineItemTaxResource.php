<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LineItemTaxResource extends JsonResource
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
            'lineItemTaxableId' => $this->line_item_taxable_id,
            'lineItemId' => $this->line_item_taxable_id,
            'lineItemTaxableType' => $this->line_item_taxable_type,
            'name' => $this->name,
            'rate' => $this->rate,
        ];
    }
}
