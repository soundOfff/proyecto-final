<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MailTemplateRequest extends FormRequest
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
            'subject' => 'required|string',
            'body' => 'required|string',
            'event' => 'required|string',
            'mail_template_group_id' => 'nullable|exists:mail_template_groups,id',
            'send_from' => 'required|string',
            'send_to' => 'nullable|string',
            'formatted' => 'nullable|boolean',
            'disabled' => 'nullable|boolean',
        ];
    }
}
