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
            'company' => 'required|string',
            'country_id' => 'required|numeric|exists:countries,id',
            'consolidator_id' => 'required|numeric|exists:partners,id',
            'billing_country_id' => 'nullable|numeric|exists:countries,id',
            'shipping_country_id' => 'nullable|numeric|exists:countries,id',
            'website' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'address' => 'nullable|string',
            'is_consolidator' => 'nullable|boolean',
            'zip' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'language' => 'nullable|string',
            'billing_city' => 'nullable|string',
            'billing_state' => 'nullable|string',
            'billing_street' => 'nullable|string',
            'billing_zip' => 'nullable|string',
            'shipping_city' => 'nullable|string',
            'shipping_state' => 'nullable|string',
            'shipping_street' => 'nullable|string',
            'shipping_zip' => 'nullable|string',
        ];
    }
}
