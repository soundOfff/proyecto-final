<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PartnerResource extends JsonResource
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
            'countryId' => $this->country_id,
            'active' => $this->active,
            'addedFrom' => $this->added_from,
            'address' => $this->address,
            'countryId' => $this->country_id,
            'billingCity' => $this->billing_city,
            'billingCountryId' => $this->billing_country_id,
            'billingState' => $this->billing_state,
            'billingStreet' => $this->billing_street,
            'billingZip' => $this->billing_zip,
            'city' => $this->city,
            'company' => $this->company,
            'isConsolidator' => $this->is_consolidator,
            'consolidatorId' => $this->consolidator_id,
            'defaultCurrency' => $this->default_currency,
            'defaultLanguage' => $this->default_language,
            'dv' => $this->dv,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'phoneNumber' => $this->phone_number,
            'registrationConfirmed' => $this->registration_confirmed,
            'shippingCity' => $this->shipping_city,
            'shippingCountryId' => $this->shipping_country_id,
            'shippingState' => $this->shipping_state,
            'shippingStreet' => $this->shipping_street,
            'shippingZip' => $this->shipping_zip,
            'showPrimaryContact' => $this->show_primary_contact,
            'state' => $this->state,
            'stripeId' => $this->stripe_id,
            'vat' => $this->vat,
            'website' => $this->website,
            'zip' => $this->zip,
            'createdAt' => Carbon::parse($this->created_at)->format('m/d/Y g:i A'),
            'country' => CountryResource::make($this->whenLoaded('country')),
            'projects' => ProjectResource::make($this->whenLoaded('projects')),
            'country' => CountryResource::make($this->whenLoaded('country')),
            'billingCountry' => CountryResource::make($this->whenLoaded('billingCountry')),
            'shippingCountry' => CountryResource::make($this->whenLoaded('shippingCountry')),
            'consolidator' => static::make($this->whenLoaded('consolidator')),
            'user' => UserResource::make($this->whenLoaded('user')),
            'primaryContact' => ContactResource::make($this->whenLoaded('primaryContact')),
        ];
    }
}
