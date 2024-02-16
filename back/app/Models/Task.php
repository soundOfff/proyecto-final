<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['name', 'hourly_rate', 'description', 'start_date', 'due_date', 'task_priority_id', 'ticket_status_id', 'repeat_id', 'recurring_type', 'recurring', 'is_infinite', 'billable', 'total_cycles', 'taskable_type', 'taskable_id'];

    /**
     * Get all of the owning taskable models.
     */

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function priority()
    {
        return $this->belongsTo(TaskPriority::class, 'task_priority_id');
    }

    public function status()
    {
        return $this->belongsTo(TicketStatus::class, 'ticket_status_id');
    }

    public function staff()
    {
        return $this->hasMany(Staff::class);
    }

}
