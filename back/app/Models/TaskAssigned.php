<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaskAssigned extends Model
{
    protected $fillable = ['task_id', 'staff_id', 'assigned_from', 'is_assigned_from_contact'];
}
