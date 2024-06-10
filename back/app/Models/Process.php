<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Process extends Model
{
    protected $fillable = [
        'id',
        'project_service_type_id',
        'author_id',
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

    public function author()
    {
        return $this->belongsTo(Staff::class, 'author_id');
    }
}
