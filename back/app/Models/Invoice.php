<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function billingCountry(): BelongsTo {
        return $this->belongsTo(Country::class, 'billing_country_id', 'id', 'billingCountry');
    }

    public function shippingCountry(): BelongsTo {
        return $this->belongsTo(Country::class, 'shipping_country_id', 'id', 'shippingCountry');
    }
}
