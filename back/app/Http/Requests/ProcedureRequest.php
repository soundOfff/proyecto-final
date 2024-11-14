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
            'author_id' => 'required|numeric|exists:staff,id',
            'is_conditional' => 'nullable|boolean',
            'step_number' => 'required|numeric',
            'name' => 'required|string',
            'responsible' => 'nullable|string',
            'description' => 'nullable|string',
            'dependencies' => 'nullable|array',
            'dependencies.*.id' => 'numeric|exists:procedures,id',
            'actions' => 'nullable|array',
            'actions.*.name' => 'nullable|string',
            'actions.*.description' => 'nullable|string',
            'actions.*.action_type_id' => 'nullable|numeric|exists:action_types,id',
            'actions.*.mail_template_id' => 'nullable|numeric|exists:mail_templates,id',
            'actions.*.mail_to' => 'nullable|string',
            'reminders' => 'nullable|array',
            'reminders.*.staff_id' => 'required|numeric|exists:staff,id',
            'reminders.*.date' => 'required|date',
            'reminders.*.description' => 'required|string',
        ];
    }
}
