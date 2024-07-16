<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
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
            'expedient' => 'nullable|string',
            'deadline' => 'nullable|date',
            'description' => 'nullable|string',
            'estimated_hours' => 'nullable|numeric',
            'cost' => 'nullable|numeric',
            'start_date' => 'required|date',
            'project_status_id' => 'required|numeric|exists:project_statuses,id',
            'responsible_person_id' => 'required|numeric|exists:staff,id',
            'defendant_id' => 'required|numeric|exists:partners,id',
            'plaintiff_id' => 'nullable|numeric|exists:partners,id',
            'project_billing_type_id' => 'required|numeric|exists:project_billing_types,id',
            'project_service_type_id' => 'required|numeric|exists:project_service_types,id',
            'project_members' => 'required|array',
            'partners' => 'required|array',
            'partners.*.id' => 'required|numeric|exists:partners,id',
            'partners.*.role' => 'required|string',
        ];
    }
}
