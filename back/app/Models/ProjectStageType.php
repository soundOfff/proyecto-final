<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectStageType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function projectStages(): HasMany
    {
        return $this->hasMany(ProjectStage::class);
    }
}
