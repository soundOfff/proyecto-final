<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FileRequest extends FormRequest
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
            'file' => 'required|file',
            'invoice_id' => 'nullable|exists:invoices,id',
            'contact_id' => 'nullable|exists:contacts,id',
            'staff_id' => 'nullable|exists:staff,id',
            'fileable_id' => 'nullable|integer',
            'fileable_type' => 'nullable|string',
            'url' => 'nullable|string',
            'subject' => 'required|string',
            'visible_to_customer' => 'required|boolean',
        ];
    }
}
