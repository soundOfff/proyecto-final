<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProcessRequest extends FormRequest
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
            'project_service_type_id' => 'required|numeric|exists:project_service_types,id',
            'author_id' => 'sometimes|numeric|exists:staff,id',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'step_quantity' => 'required|numeric',
            'forks' => 'nullable|array',
            'forks.*.id' => 'required|numeric|exists:processes,id',
            'staffs' => 'nullable|array',
            'staffs.*.id' => 'required|numeric|exists:staff,id',
        ];
    }
}
