<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubServiceType extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'label',
    ];

    public function estimates(): HasMany
    {
        return $this->hasMany(Estimate::class);
    }
}
