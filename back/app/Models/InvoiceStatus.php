<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvoiceStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'label',
    ];

    public const TO_PAY = 1;

    public const PARTIALLY_PAID = 3;

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }
}
