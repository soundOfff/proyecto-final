<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProposalRequest extends FormRequest
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
            'proposal_status_id' => 'required|numeric|exists:proposal_statuses,id',
            'staff_assigned_id' => 'required|numeric|exists:staff,id',
            'currency_id' => 'required|numeric|exists:currencies,id',
            'country_id' => 'required|numeric|exists:countries,id',
            'discount_type_id' => 'nullable|numeric|exists:discount_types,id',
            'subject' => 'required|string',
            'date' => 'required|date',
            'open_till' => 'required|date',
            'proposal_to' => 'required|string',
            'allow_comments' => 'nullable|boolean',
            'adjustment' => 'nullable|numeric',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'zip' => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'required|email',
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
        ];
    }
}
