<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PartnerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company' => 'nullable|string',
            'country_id' => 'required|numeric|exists:countries,id',
            'jurisdiction_id' => 'nullable|numeric|exists:jurisdictions,id',
            'consolidator_id' => 'nullable|numeric|exists:partners,id',
            'president_id' => 'nullable|numeric|exists:partners,id',
            'secretary_id' => 'nullable|numeric|exists:partners,id',
            'treasurer_id' => 'nullable|numeric|exists:partners,id',
            'billing_country_id' => 'nullable|numeric|exists:countries,id',
            'shipping_country_id' => 'nullable|numeric|exists:countries,id',
            'nationality_id' => 'nullable|numeric|exists:countries,id',
            'birth_place_id' => 'nullable|numeric|exists:countries,id',
            'industry_id' => 'nullable|numeric|exists:partner_industries,id',
            'section_id' => 'nullable|numeric|exists:partner_sections,id',
            'related_partners' => 'nullable|array',
            'website' => 'nullable|string',
            'civil_status' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'address' => 'nullable|string',
            'is_consolidator' => 'nullable|boolean',
            'zip' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'language' => 'nullable|string',
            'name' => 'nullable|string',
            'document' => 'nullable|string',
            'id_type' => 'nullable|string',
            'id_number' => 'nullable|string',
            'number' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'expedition_date' => 'nullable|date',
            'expiration_date' => 'nullable|date',
            'is_male' => 'nullable|boolean',
            'is_residential' => 'nullable|boolean',
            'email' => 'nullable|string',
            'building_number' => 'nullable|string',
            'billing_city' => 'nullable|string',
            'billing_state' => 'nullable|string',
            'billing_street' => 'nullable|string',
            'billing_zip' => 'nullable|string',
            'shipping_city' => 'nullable|string',
            'shipping_state' => 'nullable|string',
            'shipping_street' => 'nullable|string',
            'shipping_zip' => 'nullable|string',
            'file_number' => 'nullable|string',
            'roll_number' => 'nullable|string',
            'image_number' => 'nullable|string',
            'dv' => 'nullable|string',
            'ruc' => 'nullable|string',
            'occupation' => 'nullable|string',
        ];
    }
}
