<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    protected $fillable = ['name', 'hourly_rate', 'description', 'start_date', 'due_date', 'owner_id', 'task_priority_id', 'partner_id', 'task_status_id', 'repeat_id', 'recurring_type', 'recurring', 'is_infinite', 'billable', 'total_cycles', 'taskable_type', 'taskable_id'];

    public function taskable()
    {
        return $this->morphTo();
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    public function priority()
    {
        return $this->belongsTo(TaskPriority::class, 'task_priority_id');
    }

    public function timers()
    {
        return $this->hasMany(TaskTimer::class);
    }

    public function status()
    {
        return $this->belongsTo(TaskStatus::class, 'task_status_id');
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
        return $this->belongsToMany(Staff::class, 'staff_assigned');
    }

    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(Staff::class, 'task_followers');
    }

    public function reminders(): HasMany
    {
        return $this->hasMany(Reminder::class, 'reminderable_id');
    }

    public function getTotalTime($startDate = null, $endDate = null)
    {
        if ($startDate && $endDate) {
            $timers = $this->timers->whereBetween('start_time', [$startDate, $endDate]);
            return $this->calculateTotalTime($timers);
        }

        return $this->calculateTotalTime($this->timers);
    }

    private function calculateTotalTime($timers): float
    {
        return $timers->sum(function ($timer) {
            if (is_null($timer->end_time)) {
                return 0;
            }
            return Carbon::parse($timer->end_time)->floatDiffInRealHours($timer->start_time);
        });
    }
}
