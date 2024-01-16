<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    protected $fillable = [
        'item_group_id',
        'description',
        'long_description',
        'rate',
        'tax',
        'tax2',
        'unit',
    ];

    public function itemGroup(): BelongsTo
    {
        return $this->belongsTo(ItemGroup::class);
    }

    public function tax() : BelongsTo
    {
        return $this->belongsTo(Tax::class);
    }

    public function tax2(): BelongsTo
    {
        return $this->belongsTo(Tax::class);
    }
}
