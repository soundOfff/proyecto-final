<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Process extends Model
{
    protected $fillable = [
        'id',
        'step_quantity',
        'name',
        'description',
        'department',
    ];

    public function procedures(): HasMany
    {
        return $this->hasMany(Procedure::class);
    }
}
