<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectBillingType extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'name',
    ];

    public const FIXED_PRICE = 1;

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }
}
