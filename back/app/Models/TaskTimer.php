<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class TaskTimer extends Model
{
    protected $fillable = ['task_id', 'staff_id', 'start_time', 'end_time', 'hourly_rate', 'note'];
}
