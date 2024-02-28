<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Partner extends Model
{
    use HasFactory;

    protected $fillable = [
        'country_id',
        'active',
        'added_from',
        'address',
        'billing_city',
        'billing_country_id',
        'billing_state',
        'billing_street',
        'billing_zip',
        'city',
        'company',
        'is_consolidator',
        'consolidator_id',
        'default_currency',
        'default_language',
        'dv',
        'latitude',
        'longitude',
        'phone_number',
        'registration_confirmed',
        'shipping_city',
        'shipping_country_id',
        'shipping_state',
        'shipping_street',
        'shipping_zip',
        'show_primary_contact',
        'state',
        'stripe_id',
        'vat',
        'website',
        'zip',
        'name',
        'number',
        'birth_date',
        'expedition_date',
        'expiration_date',
        'isMale',
    ];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function primaryContact(): HasOneThrough
    {
        return $this->hasOneThrough(
            Contact::class,
            User::class,
            'id',
            'user_id',
            'user_id',
            'id'
        )->where('is_primary', true);
    }

    public function consolidator(): BelongsTo
    {
        return $this->belongsTo(self::class, 'consolidator_id', 'id', 'consolidator');
    }

    public function billingCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'billing_country_id', 'id', 'billingCountry');
    }

    public function shippingCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'shipping_country_id', 'id', 'shippingCountry');
    }

    public function proposals(): MorphMany
    {
        return $this->morphMany(Proposal::class, 'proposable');
    }

    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($query) use ($search) {
            $query->where('company', 'like', "%$search%");
        });
    }
}
