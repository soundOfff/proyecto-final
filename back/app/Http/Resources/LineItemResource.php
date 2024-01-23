<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LineItemResource extends JsonResource
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
            'lineItemableId' => $this->line_itemable_id,
            'lineItemableType' => $this->line_itemable_type,
            'description' => $this->description,
            'longDescription' => $this->long_description,
            'quantity' => $this->quantity,
            'rate' => $this->rate,
            'unit' => $this->unit,
            'itemOrder' => $this->item_order,
            'discount' => $this->item_discount,
            'type' => $this->type,
            'taxes' => LineItemTaxResource::collection($this->whenLoaded('taxes')),
        ];
    }
}
