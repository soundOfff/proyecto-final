<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    protected $fillable = [
        'name',
        'permissions',
    ];

    public function staffs(): HasMany
    {
        return $this->hasMany(Staff::class);
    }
}
