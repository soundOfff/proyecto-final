<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskRequiredField extends Model
{
    protected $fillable = [
        'task_id',
        'table',
        'field',
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
