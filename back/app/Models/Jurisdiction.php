<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Jurisdiction extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function project(): HasMany
    {
        return $this->hasMany(Project::class);
    }
}
