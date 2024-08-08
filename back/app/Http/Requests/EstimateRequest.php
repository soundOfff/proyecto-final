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
            'sale_agent_id' => 'required|numeric|exists:staff,id',
            'service_id' => 'nullable|numeric|exists:project_service_types,id',
            'sub_service_type_id' => 'nullable|numeric|exists:sub_service_types,id',
            'currency_id' => 'nullable|numeric|exists:currencies,id',
            'recurring_id' => 'nullable|numeric|exists:recurrings,id',
            'number' => 'required|string',
            'reference_no' => 'required|string',
            'date' => 'required|date',
            'expiry_date' => 'required|date',
            'estimate_status_id' => 'nullable|numeric|exists:estimate_statuses,id',
            'reference_no' => 'nullable|string',
            'admin_note' => 'nullable|string',
            'is_expiry_notified' => 'nullable|boolean',
            'client_note' => 'nullable|string',
            'terms' => 'nullable|string',
            'adjustment' => 'nullable|numeric',
            'tags' => 'nullable|array',
            'tags.*.id' => 'nullable|numeric|exists:tags,id',
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
            'expenses' => 'nullable|array',
        ];
    }
}
