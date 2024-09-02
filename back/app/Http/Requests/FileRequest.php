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
            'file' => 'nullable|file',
            'fileable_id' => 'required|integer',
            'fileable_type' => 'required|string',
            'path' => 'required|string',
            'name' => 'required|string',
            'visible_to_customer' => 'nullable|boolean',
        ];
    }
}
