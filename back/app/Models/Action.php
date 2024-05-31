<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Action extends Model
{

    public const ACTION_EXPENSE = 'expense';
    public const ACTION_API = 'api';
    public const ACTION_MAIL = 'email';

    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'task_actions');
    }

    public function procedures()
    {
        return $this->belongsToMany(Procedure::class, 'action_procedure');
    }
}
