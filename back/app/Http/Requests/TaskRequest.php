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
            'name' => 'sometimes|required|string',
            'hourly_rate' => 'sometimes|required|numeric',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'repeat_id' => 'nullable|exists:expense_repeats,id',
            'recurring_type' => 'nullable|numeric',
            'task_priority_id' => 'sometimes|required|numeric|exists:task_priorities,id',
            'partner_id' => 'nullable|numeric|exists:partners,id',
            'recurring' => 'nullable|numeric',
            'milestone_order' => 'nullable|numeric',
            'is_infinite' => 'nullable|boolean',
            'billable' => 'nullable|boolean',
            'total_cycles' => 'required_if:is_infinite,false',
            'taskable_type' => 'nullable|string',
            'taskable_id' => 'nullable|numeric',
            'owner_id' => 'nullable|numeric|exists:staff,id',
            'task_status_id' => 'sometimes|required|numeric|exists:task_statuses,id',
            'description' => 'nullable|string',
            'dependencies' => 'nullable|array',
            'dependencies.*.id' => 'nullable|numeric|exists:tasks,id',
            'tags' => 'nullable|array',
            'tags.*.id' => 'nullable|numeric|exists:tags,id',
            'assigneds' => 'nullable|array',
            'assigneds.*.id' => 'nullable|numeric|exists:staff,id',
            'followers' => 'nullable|array',
            'followers.*.id' => 'nullable|numeric|exists:staff,id',
            'reminders' => 'nullable|array',
            'reminders.*.description' => 'nullable|string',
            'reminders.*.date' => 'nullable|date',
            'reminders.*.is_notified' => 'nullable|boolean',
            'reminders.*.staff_id' => 'nullable|numeric|exists:staff,id',
            'reminders.*.reminderable_id' => 'nullable|numeric',
            'reminders.*.reminderable_type' => 'nullable|string',
            'comments' => 'nullable|array',
            'comments.*.task_id' => 'nullable|numeric|exists:tasks,id',
            'comments.*.staff_id' => 'nullable|numeric|exists:staff,id',
            'comments.*.contact_id' => 'nullable|numeric|exists:contacts,id',
            'comments.*.content' => 'nullable|string',
            'checklist_items' => 'nullable|array',
            'checklist_items.*.task_id' => 'nullable|numeric|exists:tasks,id',
            'checklist_items.*.added_from' => 'nullable|numeric',
            'checklist_items.*.description' => 'nullable|string',
            'checklist_items.*.finished' => 'nullable|boolean',
            'checklist_items.*.finished_from' => 'nullable|numeric',
            'checklist_items.*.list_order' => 'nullable|numeric',
            'requiredFields' => 'nullable|array',
            'requiredFields.*.table' => 'nullable|string',
            'requiredFields.*.field' => 'nullable|string',
        ];
    }
}
