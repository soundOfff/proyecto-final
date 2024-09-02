<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
            'partner_id' => 'required|integer|exists:partners,id',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'password' => 'nullable|string',
            'token' => 'nullable|string',
            'active' => 'nullable|boolean',
            'contract_emails' => 'boolean|required',
            'title' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'credit_note_emails' => 'nullable|boolean',
            'direction' => 'nullable|string',
            'email_verification_key'=> 'nullable|string',
            'email_verification_sent_at'=> 'nullable|string',
            'email_verified_at'=> 'nullable|string',
            'is_primary'=> 'nullable|boolean',
            'last_ip' => 'nullable|string',
            'last_login' => 'nullable|string',
            'last_password_change' => 'nullable|string',
            'new_pass_key' => 'nullable|string',
            'new_pass_key_requested' => 'nullable|string',
            'profile_image' => 'nullable|string',
            'invoice_emails' => 'nullable|boolean',
            'project_emails' => 'nullable|boolean',
            'task_emails' => 'nullable|boolean',
            'ticket_emails' => 'nullable|boolean',
            'estimate_emails' => 'nullable|boolean',
            'permissions' => 'nullable|array',
            'permissions.*.id' => 'required|integer|exists:permissions,id',
        ];
    }
}
