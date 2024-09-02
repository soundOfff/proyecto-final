<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'estimate_emails',
        'first_name',
        'invoice_emails',
        'is_primary',
        'last_ip',
        'last_login',
        'last_password_change',
        'last_name',
        'new_pass_key',
        'new_pass_key_requested',
        'partner_id',
        'password',
        'phone_number',
        'profile_image',
        'project_emails',
        'task_emails',
        'ticket_emails',
        'title',
    ];

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class);
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }

    public function proposals(): HasMany
    {
        return $this->hasMany(Proposal::class);
    }

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class);
    }
}
