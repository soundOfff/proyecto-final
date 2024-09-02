<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'itemGroupId' => $this->item_group_id,
            'description' => $this->description,
            'long_description' => $this->long_description,
            'rate' => $this->rate,
            'unit' => $this->unit,
            'itemGroup' => ItemGroupResource::make($this->whenLoaded('itemGroup')),
            'tax' => TaxResource::make($this->whenLoaded('tax')),
            'tax2' => TaxResource::make($this->whenLoaded('tax2')),
        ];
    }
}
