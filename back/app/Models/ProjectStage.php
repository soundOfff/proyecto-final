<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectStage extends Model
{
    protected $fillable = [
        'start_timestamp',
        'end_timestamp',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
