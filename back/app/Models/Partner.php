<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

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
        'industry_id',
        'section_id',
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
        'civil_status',
        'expedition_date',
        'expiration_date',
        'is_male',
        'file_number',
        'roll_number',
        'image_number',
        'ruc',
        'occupation',
    ];

    protected $appends = ['merged_name'];

    public static $MAIL_TEMPLATE_ALLOWED_FIELDS = ['name', 'number', 'company', 'website', 'dv', 'ruc'];

    public static $defendantDocumentRules = [
        'country_id' => 'required|exists:countries,id',
        'jurisdiction_id' => 'required|exists:jurisdictions,id',
        'address' => 'required',
        'id_type' => 'required',
        'id_number' => 'required',
    ];

    public static $plaintiffDocumentRules = [
        'country_id' => 'required|exists:countries,id',
        'jurisdiction_id' => 'required|exists:jurisdictions,id',
        'address' => 'required',
        'phone_number' => 'required',
        'file_number' => 'required',
        'image_number' => 'required',
        'roll_number' => 'required',
    ];

    public static $representativeDocumentRules = [
        'country_id' => 'required|exists:countries,id',
        'jurisdiction_id' => 'required|exists:jurisdictions,id',
        'address' => 'required',
        'civil_status' => 'required',
        'id_number' => 'required',
        'id_type' => 'required',
        'occupation' => 'required', // pivot append data
        'check_in' => 'required',
        'deed' => 'required',
        'notary' => 'required',
        'deed_date' => 'required',
        'seat' => 'required',
        'legal_circuit' => 'required',
        'sheet' => 'required',
    ];

    public function validate($rules = [])
    {
        if (empty($rules)) {
            $rules = $this->toArray();
        }

        $attributes = $this->getAttributes();
        if (isset($this->pivot)) {
            $attributes = array_merge($this->getAttributes(), $this->pivot->getAttributes());
        }

        $validator = Validator::make($attributes, $rules);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

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

    public function president(): BelongsToMany
    {
        return $this->relatedPartners()
            ->wherePivot('partner_type_id', PartnerType::PRESIDENT);
    }

    public function secretary(): BelongsToMany
    {
        return $this->relatedPartners()
            ->wherePivot('partner_type_id', PartnerType::SECRETARY);
    }

    public function director(): BelongsToMany
    {
        return $this->relatedPartners()
            ->wherePivot('partner_type_id', PartnerType::DIRECTOR);
    }

    public function representative(): BelongsToMany
    {
        return $this->relatedPartners()
            ->wherePivot('partner_type_id', PartnerType::OWNER);
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
            ['start_date', 'end_date', 'partner_type_id', 'seat', 'check_in', 'deed', 'deed_date', 'legal_circuit', 'notary', 'sheet', 'active']
        );
    }

    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function notes(): MorphMany
    {
        return $this->morphMany(Note::class, 'notable');
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
