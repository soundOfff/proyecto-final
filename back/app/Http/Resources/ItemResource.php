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
            'item_group_id' => $this->item_group_id, 
            'description' => $this->description,
            'long_description' => $this->long_description,
            'rate' => $this->rate,
            'tax' => $this->tax,
            'tax2' => $this->tax2,
            'unit' => $this->unit,
        ];
    }
}
