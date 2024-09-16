<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NoteResource extends JsonResource
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
            'notableId' => $this->notable_id,
            'notableType' => $this->notable_type,
            'description' => $this->description,
            'createdAt' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'notable' => $this->whenLoaded('notable', function () {
                return $this->notable_type === 'customer'
                    ? PartnerResource::make($this->notable)
                    : null;
            }),
        ];
    }
}
