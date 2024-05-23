<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectServiceType extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'name',
    ];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function processes(): HasMany
    {
        return $this->hasMany(Process::class);
    }
}
