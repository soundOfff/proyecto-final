<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreditNoteRequest extends FormRequest
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
            'currency_id' => 'nullable|numeric|exists:currencies,id',
            'number' => 'required|string',
            'reference_no' => 'required|string',
            'date' => 'required|date',
            'reference_no' => 'nullable|string',
            'admin_note' => 'nullable|string',
            'client_note' => 'nullable|string',
            'terms' => 'nullable|string',
            'adjustment' => 'nullable|numeric',
            'items' => 'required|array',
            'items.*.description' => 'required|string',
            'items.*.long_description' => 'nullable|string',
            'items.*.line_item_type_id' => 'nullable|numeric|exists:line_item_types,id',
            'items.*.quantity' => 'required|numeric',
            'items.*.rate' => 'required|numeric',
            'items.*.discount' => 'nullable|numeric',
            'items.*.unit' => 'nullable|string',
            'items.*.taxes' => 'nullable|array',
            'discount_total' => 'required|numeric',
            'subtotal' => 'required|numeric',
            'total_tax' => 'required|numeric',
            'total' => 'required|numeric',
        ];
    }
}
