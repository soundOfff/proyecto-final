<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProcedureStatus extends Model
{
    protected $fillable = [
        'id',
        'name',
    ];

    public function procedures(): HasMany
    {
        return $this->hasMany(Procedure::class);
    }
}
