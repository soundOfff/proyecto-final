<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Process extends Model
{
    protected $fillable = [
        'id',
        'project_id',
        'step_quantity',
        'name',
        'description',
        'department',
    ];

    public function projectServiceType(): BelongsTo
    {
        return $this->belongsTo(ProjectServiceType::class);
    }

    public function procedures(): HasMany
    {
        return $this->hasMany(Procedure::class);
    }

    public function validateIfStepNumberExists(int $stepNumber): bool
    {
        return $this->procedures()->where('step_number', $stepNumber)->exists();
    }
}
