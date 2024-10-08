<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Notifications\Slack\BlockKit\Blocks\SectionBlock;
use Illuminate\Support\Facades\Log;
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

    public const DEFENDANT_DOCUMENT_RULES = [
        'country_id' => 'required|exists:countries,id',
        'jurisdiction_id' => 'required|exists:jurisdictions,id',
        'address' => 'required',
        'id_type' => 'required',
        'id_number' => 'required',
    ];

    public const PLAINTIFF_DOCUMENT_RULES = [
        'country_id' => 'required|exists:countries,id',
        'jurisdiction_id' => 'required|exists:jurisdictions,id',
        'address' => 'required',
        'phone_number' => 'required',
        'file_number' => 'required',
        'image_number' => 'required',
        'roll_number' => 'required',
    ];

    public const REPRESENTATIVE_DOCUMENT_RULES = [
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

    public function validate($rules, $from)
    {
        $defaultMessages = [
            'country_id.required' => "El campo país es obligatorio para el $from.",
            'country_id.exists' => "El país seleccionado no es válido para el $from.",
            'jurisdiction_id.required' => "El campo jurisdicción es obligatorio para el $from.",
            'jurisdiction_id.exists' => "La jurisdicción seleccionada no es válida para el $from.",
            'address.required' => "El campo dirección es obligatorio para el $from.",
            'id_type.required' => "El campo tipo de identificación es obligatorio para el $from.",
            'id_number.required' => "El campo número de identificación es obligatorio para el $from.",
            'phone_number.required' => "El campo número de teléfono es obligatorio para el $from.",
            'file_number.required' => "El campo número de archivo es obligatorio para el $from.",
            'image_number.required' => "El campo número de imagen es obligatorio para el $from.",
            'roll_number.required' => "El campo número de rol es obligatorio para el $from.",
            'civil_status.required' => "El campo estado civil es obligatorio para el $from.",
            'occupation.required' => "El campo ocupación es obligatorio para el $from.",
            'check_in.required' => "El campo fecha de ingreso es obligatorio para el $from.",
            'deed.required' => "El campo escritura es obligatorio para el $from.",
            'notary.required' => "El campo notario es obligatorio para el $from.",
            'deed_date.required' => "El campo fecha de escritura es obligatorio para el $from.",
            'seat.required' => "El campo asiento es obligatorio para el $from.",
            'legal_circuit.required' => "El campo circuito legal es obligatorio para el $from.",
            'sheet.required' => "El campo folio es obligatorio para el $from.",
        ];

        if (empty($rules)) {
            $rules = $this->toArray();
        }

        $attributes = $this->getAttributes();
        if (isset($this->pivot)) {
            $attributes = array_merge($this->getAttributes(), $this->pivot->getAttributes());
        }

        $validator = Validator::make($attributes, $rules, $defaultMessages);
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

    public function getSlackNotificationBlocks(SectionBlock $block): void
    {
        if ($this->company) { // if is juridical
            $industry = $this->industry ?: '-';
            $section = $this->section ?: '-';
            $document = $this->document ?: '-';
            $phone = $this->phone ?: '-';
            $country = $this->country ? $this->country->short_name : '-';
            $district = $this->jurisdiction ? ($this->jurisdiction->district ? $this->jurisdiction->district->name : '-') : '-';
            $jurisdiction = $this->jurisdiction ? $this->jurisdiction->name : '-';
            $place = "$country, $district, $jurisdiction";
            $address = $this->address ?: '-';
            $zip = $this->zip ?: '-';
            $rollNumber = $this->roll_number ?: '-';
            $dv = $this->dv ?: '-';
            $ruc = $this->ruc ?: '-';
            $mail = $this->mail ?: '-';
            $relatedPersons = $this->relatedPartners->implode('merged_name', ', ');

            $block->text("*Empresa:* {$this->company}\n *Industria:* {$industry}\n *Sección:* {$section}\n *Folio:* {$document}\n *Teléfono:* {$phone}\n *Mail:* {$mail}\n *Dirección:* {$address}\n *Ubicación:* {$place}\n *Personas Relacionadas:* {$relatedPersons}")->markdown();
            $block->field("*Código Postal:* {$zip}")->markdown();
            $block->field("*Número de rol:* {$rollNumber}")->markdown();
            $block->field("*DV:* {$dv}")->markdown();
            $block->field("*RUC:* {$ruc}")->markdown();
        } else {
            $number = $this->number ?: '-';
            $birthDate = $this->birth_date ? Carbon::parse($this->birth_date)->format('Y-m-d') : '-';
            $birthPlace = $this->birthPlace ? $this->birthPlace->name : '-';
            $expeditionDate = $this->expedition_date ? Carbon::parse($this->expedition_date)->format('Y-m-d') : '-';
            $nationalityName = $this->nationality ? $this->nationality->short_name : '-';
            $idType = $this->id_type ?: '-';
            $idNumber = $this->id_number ?: '-';
            $civilStatus = $this->civil_status ?: '-';
            $occupation = $this->occupation ?: '-';
            $address = $this->address ?: '-';
            $phone = $this->phone ?: '-';
            $mail = $this->mail ?: '-';
            $country = $this->country ? $this->country->short_name : '-';
            $district = $this->jurisdiction ? ($this->jurisdiction->district ? $this->jurisdiction->district->name : '-') : '-';
            $jurisdiction = $this->jurisdiction ? $this->jurisdiction->name : '-';
            $place = "$country, $district, $jurisdiction";
            $relatedPersons = $this->relatedPartners->implode('merged_name', ', ');

            $block->text("*Nombre:* {$this->name}\n *Número de identificación:* {$number}\n *Fecha De Nacimiento:* {$birthDate}\n *Fecha De Expedición:* {$expeditionDate}\n *Nacionalidad:* {$nationalityName}\n *Lugar de Nacimiento:* {$birthPlace}\n *Tipo de Identificación:* {$idType}\n *Número de Identificación: * {$idNumber}\n *Personas Relacionadas: * {$relatedPersons}")->markdown();
            $block->field("*Estado Civil:* {$civilStatus}")->markdown();
            $block->field("*Ocupación:* {$occupation}")->markdown();
            $block->field("*Dirección:* {$address}")->markdown();
            $block->field("*Teléfono:* {$phone}")->markdown();
            $block->field("*Mail:* {$mail}")->markdown();
            $block->field("*Ubicación:* {$place}")->markdown();
        }
    }
}
