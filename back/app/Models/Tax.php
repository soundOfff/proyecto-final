<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tax extends Model
{
    protected $fillable = [
        'id',
        'name',
        'rate',
    ];

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
