<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LineItemTax extends Model
{
    protected $fillable = [
        'line_item_taxable_id',
        'line_item_taxable_type',
        'line_item_id',
        'name',
        'rate',
    ];

    public function item(): BelongsTo
    {
        return $this->belongsTo(LineItem::class);
    }
}
