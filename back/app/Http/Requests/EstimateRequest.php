<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EstimateRequest extends FormRequest
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
            'partner_id' => 'required|numeric|exists:partners,id',
            'project_id' => 'required|numeric|exists:projects,id',
            'number' => 'required|string',
            'reference_no' => 'required|string',
            'date' => 'required|date',
            'expiry_date' => 'required|date',
            'service_id' => 'required|numeric',
            'sub_service_id' => 'nullable|numeric',
            'stop_pending_remainder' => 'required|boolean',
            'currency_id' => 'nullable|numeric|exists:currencies,id',
            'reference_no' => 'nullable|string',
            'repeat_id' => 'nullable',
            'admin_note' => 'nullable|string',
            'client_note' => 'nullable|string',
            'terms' => 'nullable|string',
            'adjustment' => 'nullable|numeric',
            'tags' => 'nullable|array',
            'tags.*.id' => 'nullable|numeric|exists:tags,id',
            'items' => 'required|array',
            'items.*.description' => 'required|string',
            'items.*.long_description' => 'nullable|string',
            'items.*.type' => 'nullable|string',
            'items.*.quantity' => 'required|numeric',
            'items.*.rate' => 'required|numeric',
            'items.*.discount' => 'nullable|numeric',
            'items.*.unit' => 'nullable|string',
            'items.*.taxes' => 'nullable|array',
            'subtotal' => 'required|numeric',
            'total_tax' => 'required|numeric',
            'total' => 'required|numeric',
        ];
    }
}
