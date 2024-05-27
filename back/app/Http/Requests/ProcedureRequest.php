<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProcedureRequest extends FormRequest
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
            'process_id' => 'required|numeric|exists:processes,id',
            'procedure_status_id' => 'nullable|numeric|exists:procedure_statuses,id',
            'step_number' => 'required|numeric',
            'name' => 'required|string',
            'responsible_id' => 'nullable|numeric|exists:staff,id',
            'description' => 'nullable|string',
            'dependencies' => 'nullable|array',
            'dependencies.*.id' => 'numeric|exists:procedures,id',
        ];
    }
}
