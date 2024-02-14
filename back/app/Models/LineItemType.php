<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LineItemType extends Model
{
    protected $fillable = [
        'id',
        'label',
    ];

    public function lineItems(): HasMany
    {
        return $this->hasMany(LineItem::class);
    }
}
