<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItemRequest extends FormRequest
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
            'description' => 'required|string',
            'rate' => 'required|numeric',
            'item_group_id' => 'nullable|numeric|exists:item_groups,id',
            'long_description' => 'nullable|string',
            'tax_id' => 'nullable|numeric|exists:taxes,id',
            'tax2_id' => 'nullable|numeric|exists:taxes,id|different:tax',
            'unit' => 'nullable|string',
        ];
    }
}
