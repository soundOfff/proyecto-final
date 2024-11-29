<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class LineItem extends Model
{
    protected $fillable = [
        'line_itemable_id',
        'line_itemable_type',
        'line_item_type_id',
        'description',
        'long_description',
        'quantity',
        'rate',
        'unit',
        'item_order',
        'discount',
    ];

    public function lineItemable(): MorphTo
    {
        return $this->morphTo();
    }

    public function taxes(): HasMany
    {
        return $this->hasMany(LineItemTax::class);
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(LineItemType::class, 'line_item_type_id');
    }

    public function getSubtotal(): float
    {
        return $this->quantity * $this->rate;
    }

    public function getTotalAmount(): float
    {
        $taxAmount = $this->taxes->sum('rate');

        return $this->getSubtotal() * (1 + ($taxAmount / 100));
    }
}
