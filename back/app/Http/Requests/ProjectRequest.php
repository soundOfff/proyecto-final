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
            'start_date' => 'required|date',
            'project_status_id' => 'required|numeric|exists:project_statuses,id',
            'responsible_person_id' => 'required|numeric|exists:staff,id',
            'billable_partner_id' => 'required|numeric|exists:partners,id',
            'project_members' => 'required|array',
            'project_billing_type_id' => 'required|numeric|exists:project_billing_types,id',
            'project_service_type_id' => 'required|numeric|exists:project_service_types,id',
            'proposal_id' => 'nullable|numeric|exists:proposals,id',
            'process_id' => 'nullable|numeric|exists:processes,id',
            'court_id' => 'nullable|numeric|exists:courts,id',
            'expedient' => 'nullable|string',
            'deadline' => 'nullable|date',
            'description' => 'nullable|string',
            'estimated_hours' => 'nullable|numeric',
            'cost' => 'nullable|numeric',
            'demand_amount' => 'nullable|numeric',
            'type' => 'nullable|string',
            'partners' => 'nullable|array',
            'partners.*.id' => 'required|numeric|exists:partners,id',
            'partners.*.role_id' => 'required|numeric|exists:partner_project_roles,id',
            'partners.*.owner_id' => 'nullable|numeric|exists:partners,id',
            'notes' => 'nullable|array',
            'notes.*.content' => 'required|string',
            'notes.*.staff_id' => 'required|numeric|exists:staff,id',
        ];
    }
}
