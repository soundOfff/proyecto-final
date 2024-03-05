<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StaffResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'active' => $this->active,
            'admin' => $this->admin,
            'default_language' => $this->default_language,
            'direction' => $this->direction,
            'email' => $this->email,
            'emailSignature' => $this->email_signature,
            'facebook' => $this->facebook,
            'firstName' => $this->first_name,
            'hourlyRate' => $this->hourly_rate,
            'isNotStaff' => $this->is_not_staff,
            'linkedin' => $this->linkedin,
            'lastActivity' => $this->last_activity,
            'lastIp' => $this->last_ip,
            'lastLogin' => $this->last_login,
            'lastName' => $this->last_name,
            'name' => $this->first_name.' '.$this->last_name,
            'lastPasswordChange' => $this->last_password_change,
            'mediaPathSlug' => $this->media_path_slug,
            'newPassKey' => $this->new_pass_key,
            'newPassKeyRequested' => $this->new_pass_key_requested,
            'password' => $this->password,
            'phoneNumber' => $this->phone_number,
            'profileImage' => $this->profile_image,
            'skype' => $this->skype,
            'twoFactorAuthCode' => $this->two_factor_auth_code,
            'twoFactorAuthCodeRequested' => $this->two_factor_auth_code_requested,
            'twoFactorAuthEnabled' => $this->two_factor_auth_enabled,
            'token' => $this->token,
            'projects' => ProjectResource::collection($this->whenLoaded('project')),
            'contacts' => ContactResource::collection($this->whenLoaded('contacts')),
            'role' => RoleResource::make($this->whenLoaded('role')),
        ];
    }
}
