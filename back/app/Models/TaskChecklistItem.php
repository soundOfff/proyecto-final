<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskChecklistItem extends Model
{
    protected $fillable = ['task_id', 'added_from', 'description', 'finished', 'finished_from', 'list_order'];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
