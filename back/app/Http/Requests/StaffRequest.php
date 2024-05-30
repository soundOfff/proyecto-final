<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffRequest extends FormRequest
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
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'password' => 'required|string',
            'active' => 'nullable|boolean',
            'admin' => 'required|boolean',
            'default_language' => 'nullable|string',
            'direction' => 'nullable|string',
            'email' => 'required|email',
            'email_signature' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'hourly_rate' => 'nullable|numeric',
            'facebook' => 'nullable|string',
            'is_not_staff' => 'nullable|boolean',
            'linkedin' => 'nullable|string',
            'last_activity' => 'nullable|date',
            'last_ip' => 'nullable|string',
            'last_login' => 'nullable|date',
            'last_password_change' => 'nullable|date',
            'media_path_slug' => 'nullable|string',
            'new_pass_key' => 'nullable|string',
            'new_pass_key_requested' => 'nullable|date',
            'profile_image' => 'nullable|string',
            'skype' => 'nullable|string',
            'two_factor_auth_code' => 'nullable|string',
            'two_factor_auth_code_requested' => 'nullable|date',
            'two_factor_auth_enabled' => 'nullable|boolean',
            'role_id' => 'nullable|numeric|exists:roles,id',
            'welcome_email' => 'nullable|boolean',
            'token' => 'nullable|string',
        ];
    }
}
