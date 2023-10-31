<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Client extends Model
{
    protected $fillable = [
        'country_id',
        'email',
        'first_name',
        'active',
        'added_from',
        'address',
        'billing_city',
        'billing_country',
        'billing_state',
        'billing_street',
        'billing_zip',
        'city',
    ];

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }
}
