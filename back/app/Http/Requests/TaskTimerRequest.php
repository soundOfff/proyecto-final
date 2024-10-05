<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskTimerRequest extends FormRequest
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
            'task_id' => 'sometimes|required|numeric|exists:tasks,id',
            'staff_id' => 'sometimes|required|numeric|exists:staff,id',
            'start_time' => 'sometimes|required|date',
            'end_time' => 'nullable|date',
            'hourly_rate' => 'nullable|numeric',
            'note' => 'nullable|string'
        ];
    }
}
