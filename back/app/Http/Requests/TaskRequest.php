<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
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
            'hourly_rate' => 'required|numeric',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'repeat_id' => 'nullable|exists:expense_repeats,id',
            'recurring_type' => 'nullable|numeric',
            'task_priority_id' => 'required|numeric|exists:task_priorities,id',
            'recurring' => 'nullable|numeric',
            'is_infinite' => 'nullable|boolean',
            'billable' => 'nullable|boolean',
            'total_cycles' => 'required_if:is_infinite,false',
            'taskable_type' => 'nullable|string',
            'taskable_id' => 'nullable|numeric',
            'ticket_status_id' => 'sometimes|required|numeric|exists:ticket_statuses,id',
            'tags' => 'nullable|array',
            'tags.*.id' => 'nullable|numeric|exists:tags,id',
            'description' => 'nullable|string',
        ];
    }
}
