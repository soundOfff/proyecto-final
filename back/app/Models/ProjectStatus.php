<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectStatus extends Model
{
    public const NOT_STARTED = 1;

    public const DEVELOPING = 2;

    public const WAITING = 3;

    public const CANCELED = 4;

    public const FINISHED = 5;

    protected $fillable = [
        'name',
        'label',
    ];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }
}
