<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    protected $fillable = ['name', 'hourly_rate', 'description', 'start_date', 'due_date', 'task_priority_id', 'ticket_status_id', 'repeat_id', 'recurring_type', 'recurring', 'is_infinite', 'billable', 'total_cycles', 'taskable_type', 'taskable_id'];

    public function taskable()
    {
        return $this->morphTo();
    }

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

    public function comments()
    {
        return $this->hasMany(TaskComment::class);
    }

    public function checklistItems(): HasMany
    {
        return $this->hasMany(TaskChecklistItem::class);
    }

    public function assigneds(): BelongsToMany
    {
        return $this->belongsToMany(Staff::class, 'task_assigned');
    }

    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(Staff::class, 'task_followers');
    }

    public function reminders(): HasMany
    {
        return $this->hasMany(Reminder::class, 'reminderable_id');
    }
}
