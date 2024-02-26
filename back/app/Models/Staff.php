<?php

namespace App\Models;

use Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Staff extends Model
{
    use HasFactory;

    protected $fillable = [
        'active',
        'admin',
        'default_language',
        'direction',
        'email',
        'email_signature',
        'facebook',
        'first_name',
        'hourly_rate',
        'is_not_staff',
        'linkedin',
        'last_activity',
        'last_ip',
        'last_login',
        'last_name',
        'last_password_change',
        'media_path_slug',
        'new_pass_key',
        'new_pass_key_requested',
        'password',
        'phone_number',
        'profile_image',
        'skype',
        'two_factor_auth_code',
        'two_factor_auth_code_requested',
        'two_factor_auth_enabled',
    ];

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class);
    }
}
