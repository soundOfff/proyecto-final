<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskTimer extends Model
{
    protected $fillable = ['task_id', 'staff_id', 'start_time', 'end_time', 'hourly_rate', 'note'];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
