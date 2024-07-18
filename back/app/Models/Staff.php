<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\Traits\CausesActivity;

class Staff extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, CausesActivity, SoftDeletes;

    protected $fillable = [
        'active',
        'admin',
        'default_language',
        'direction',
        'email',
        'email_signature',
        'password',
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
        'welcome_email',
        'skype',
        'two_factor_auth_code',
        'two_factor_auth_code_requested',
        'two_factor_auth_enabled',
        'role_id',
        'token',
    ];

    protected $appends = ['name'];

    static $MAIL_TEMPLATE_ALLOWED_FIELDS = ['first_name', 'last_name', 'email'];

    protected function name(): Attribute
    {
        return new Attribute(
            get: fn () => "$this->first_name $this->last_name",
        );
    }

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

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class);
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'responsible_person_id');
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

    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class);
    }

    public function lastSession(): Session | null
    {
        return $this->sessions->last();
    }

    public function devices(): HasMany
    {
        return $this->hasMany(StaffDevice::class);
    }
}
