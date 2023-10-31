<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'active',
        'contract_emails',
        'credit_note_emails',
        'direction',
        'email',
        'email_verification_key',
        'email_verification_sent_at',
        'email_verified_at',
        'first_name',
        'invoice_emails',
        'is_primary',
        'last_ip',
        'last_login',
        'last_password_change',
        'last_name',
        'new_pass_key',
        'new_pass_key_requested',
        'password',
        'phone_number',
        'profile_image',
        'project_emails',
        'task_emails',
        'ticket_emails',
        'title',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }
}
