<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Staff extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

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
        'phone_number',
        'profile_image',
        'skype',
        'two_factor_auth_code',
        'two_factor_auth_code_requested',
        'two_factor_auth_enabled',
        'role_id',
        'token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
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

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'owner_id');
    }

    public function timers(): HasMany
    {
        return $this->hasMany(TaskTimer::class);
    }

    public function getCurrentTimer(): TaskTimer | null
    {
        return $this->timers->whereNull('end_time')->first();
    }
}
