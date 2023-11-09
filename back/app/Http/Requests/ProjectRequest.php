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
            'name' => 'required|string',
            'expedient' => 'required|string',
            'deadline' => 'required|date',
            'description' => 'required|string',
            'estimated_hours' => 'required|numeric',
            'cost' => 'required|numeric',
            'start_date' => 'required|date',
            'project_status_id' => 'required|numeric|exists:project_statuses,id',
            'defendant_id' => 'required|numeric|exists:partners,id',
            'plaintiff_id' => 'required|numeric|exists:partners,id',
            'responsible_person_id' => 'required|numeric|exists:contacts,id',
            'project_billing_type_id' => 'required|numeric|exists:project_billing_types,id',
            'project_service_type_id' => 'required|numeric|exists:project_service_types,id',
            'project_member_ids' => 'required|array',
            'project_member_ids.*' => 'required|numeric|exists:staff,id',
        ];
    }
}
