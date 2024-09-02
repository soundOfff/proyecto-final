<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Currency extends Model
{
    protected $fillable = [
        'id',
        'symbol',
        'decimal_separator',
        'thousand_separator',
        'placement',
        'is_default',
    ];

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
