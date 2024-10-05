<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectStage extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_timestamp',
        'end_timestamp',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(ProjectStageType::class, 'project_stage_type_id');
    }
}
