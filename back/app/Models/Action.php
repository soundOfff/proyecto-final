<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    protected $fillable = [
        'id',
        'name',
        'description',
        'action_type_id',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function procedure()
    {
        return $this->belongsTo(Procedure::class);
    }

    public function type()
    {
        return $this->belongsTo(ActionType::class, 'action_type_id');
    }
}
