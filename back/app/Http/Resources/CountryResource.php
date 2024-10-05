<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CountryResource extends JsonResource
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
            'callingCode' => $this->calling_code,
            'cctld' => $this->cctld,
            'iso2' => $this->iso2,
            'iso3' => $this->iso3,
            'longName' => $this->long_name,
            'numCode' => $this->num_code,
            'shortName' => $this->short_name,
            'unMember' => $this->un_member,
            'partners' => PartnerResource::collection($this->whenLoaded('partners')),
        ];
    }
}
