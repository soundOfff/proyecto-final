<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LawFirm extends Model
{
    protected $fillable = [
        'name',
    ];

    public function country(): HasMany
    {
        return $this->hasMany(Project::class);
    }
}
