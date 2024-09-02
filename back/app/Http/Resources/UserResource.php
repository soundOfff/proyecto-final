<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'role' => RoleResource::make($this->whenLoaded('role')),
            'contacts' => ContactResource::collection($this->whenLoaded('contacts')),
            'partners' => PartnerResource::collection($this->whenLoaded('partners')),
        ];
    }
}
