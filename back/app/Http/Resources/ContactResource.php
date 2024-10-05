<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
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
            'partnerId' => $this->partner_id,
            'active' => $this->active,
            'contractEmails' => $this->contract_emails,
            'creditNoteEmails' => $this->credit_note_emails,
            'direction' => $this->direction,
            'email' => $this->email,
            'email_verification_key' => $this->email_verification_key,
            'email_verification_sent_at' => $this->email_verification_sent_at,
            'email_verified_at' => $this->email_verified_at,
            'firstName' => $this->first_name,
            'invoiceEmails' => $this->invoice_emails,
            'isPrimary' => $this->is_primary,
            'lastIp' => $this->last_ip,
            'lastLogin' => $this->last_login,
            'lastPasswordChange' => $this->last_password_change,
            'lastName' => $this->last_name,
            'name' => $this->first_name.' '.$this->last_name,
            'newPassKey' => $this->new_pass_key,
            'newPassKeyRequested' => $this->new_pass_key_requested,
            'phoneNumber' => $this->phone_number,
            'profileImage' => $this->profile_image,
            'projectEmails' => $this->project_emails,
            'taskEmails' => $this->task_emails,
            'ticketEmails' => $this->ticket_emails,
            'title' => $this->title,
            'partner' => PartnerResource::make($this->whenLoaded('partner')),
            'staff' => StaffResource::make($this->whenLoaded('staff')),
            'permissions' => PermissionResource::collection($this->whenLoaded('permissions')),
        ];
    }
}
