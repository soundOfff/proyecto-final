<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Partner extends Model
{
    use HasFactory;

    protected $fillable = [
        'country_id',
        'jurisdiction_id',
        'nationality_id',
        'birth_place_id',
        'president_id',
        'secretary_id',
        'treasurer_id',
        'active',
        'added_from',
        'address',
        'id_type',
        'id_number',
        'billing_city',
        'billing_country_id',
        'billing_state',
        'billing_street',
        'billing_zip',
        'city',
        'document',
        'industry',
        'section',
        'company',
        'is_consolidator',
        'consolidator_id',
        'default_currency',
        'default_language',
        'dv',
        'latitude',
        'longitude',
        'phone_number',
        'email',
        'building_number',
        'is_residential',
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
        'is_male',
        'file_number',
        'roll_number',
        'image_number',
        'ruc',
    ];

    static $MAIL_TEMPLATE_ALLOWED_FIELDS = ['name', 'number', 'company', 'website', 'dv', 'ruc'];


    protected $appends = ['merged_name'];

    protected function mergedName(): Attribute
    {
        return new Attribute(
            get: fn () => $this->company ? $this->company : $this->name
        );
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function jurisdiction(): BelongsTo
    {
        return $this->belongsTo(Jurisdiction::class);
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    public function consolidator(): BelongsTo
    {
        return $this->belongsTo(self::class, 'consolidator_id', 'id', 'consolidator');
    }

    public function president(): BelongsTo
    {
        return $this->belongsTo(self::class, 'president_id', 'id', 'president');
    }

    public function secretary(): BelongsTo
    {
        return $this->belongsTo(self::class, 'secretary_id', 'id', 'secretary');
    }

    public function treasurer(): BelongsTo
    {
        return $this->belongsTo(self::class, 'treasurer_id', 'id', 'treasurer');
    }

    public function billingCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'billing_country_id', 'id', 'billingCountry');
    }

    public function shippingCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'shipping_country_id', 'id', 'shippingCountry');
    }

    public function nationality(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'nationality_id', 'id', 'nationality');
    }

    public function birthPlace(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'birth_place_id', 'id', 'birthPlace');
    }

    public function proposals(): MorphMany
    {
        return $this->morphMany(Proposal::class, 'proposable');
    }

    public function relatedPartners(): BelongsToMany
    {
        return $this->belongsToMany(self::class, 'related_partner', 'partner_id', 'related_partner_id')->withPivot(
            ['start_date', 'end_date', 'partner_type_id', 'active']
        );
    }

    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($query) use ($search) {
            $query->where(function ($query) use ($search) {
                $query
                    ->where('company', 'like', "%$search%")
                    ->orWhere('name', 'like', "%$search%");
            });
        });
    }
}
