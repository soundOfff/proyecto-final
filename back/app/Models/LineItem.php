<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class LineItem extends Model
{
    protected $fillable = [
        'id',
        'line_itemable_id',
        'line_itemable_type',
        'description',
        'long_description',
        'quantity',
        'rate',
        'unit',
        'item_order',
        'item_discount',
        'type',
    ];

    public function lineItemable(): MorphTo
    {
        return $this->morphTo();
    }

    public function taxes(): HasMany
    {
        return $this->hasMany(LineItemTax::class);
    }
}
