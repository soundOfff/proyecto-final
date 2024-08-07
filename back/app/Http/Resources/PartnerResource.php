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
            'provinceId' => $this->province_id,
            'districtId' => $this->district_id,
            'jurisdictionId' => $this->jurisdiction_id,
            'nationalityId' => $this->nationality_id,
            'birthPlaceId' => $this->birth_place_id,
            'presidentId' => $this->president_id,
            'secretaryId' => $this->secretary_id,
            'treasurerId' => $this->treasurer_id,
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
            'idType' => $this->id_type,
            'idNumber' => $this->id_number,
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
            'name' => $this->name,
            'number' => $this->number,
            'birthDate' => $this->birth_date,
            'expeditionDate' => $this->expedition_date,
            'expirationDate' => $this->expiration_date,
            'isMale' => $this->is_male,
            'email' => $this->email,
            'isResidential' => $this->is_residential,
            'buildingNumber' => $this->building_number,
            'fileNumber' => $this->file_number,
            'imageNumber' => $this->image_number,
            'rollNumber' => $this->roll_number,
            'ruc' => $this->ruc,
            'dv' => $this->dv,
            'mergedName' => $this->merged_name,
            'industryId' => $this->industry_id,
            'sectionId' => $this->section_id,
            'document' => $this->document,
            'relatedPartners' => self::collection($this->whenLoaded('relatedPartners')),
            'pivot' => $this->pivot,
            'files' => FileResource::collection($this->whenLoaded('files')),
            'createdAt' => Carbon::parse($this->created_at)->format('m/d/Y g:i A'),
            'country' => CountryResource::make($this->whenLoaded('country')),
            'nationality' => CountryResource::make($this->whenLoaded('nationality')),
            'birthPlace' => CountryResource::make($this->whenLoaded('birthPlace')),
            'jurisdiction' => JurisdictionResource::make($this->whenLoaded('jurisdiction')),
            'projects' => ProjectResource::make($this->whenLoaded('projects')),
            'billingCountry' => CountryResource::make($this->whenLoaded('billingCountry')),
            'shippingCountry' => CountryResource::make($this->whenLoaded('shippingCountry')),
            'consolidator' => static::make($this->whenLoaded('consolidator')),
            'president' => static::make($this->whenLoaded('president')),
            'secretary' => static::make($this->whenLoaded('secretary')),
            'treasurer' => static::make($this->whenLoaded('treasurer')),
            'contacts' => ContactResource::collection($this->whenLoaded('contacts')),
            'primaryContact' => ContactResource::make($this->whenLoaded('primaryContact')),
            'role' => $this->whenPivotLoaded('partner_project', function () {
                return $this->pivot->role;
            }),
            'owner' => $this->whenPivotLoaded('partner_project', function () {
                return $this->pivot->owner;
            }),
        ];
    }
}
