<?php

namespace App\Models;

use App\Http\Resources\InvoiceResource;
use App\Http\Resources\ProjectResource;
use App\Observers\TaskObserver;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

#[ObservedBy([TaskObserver::class])]
class Task extends Model
{
    protected $fillable = [
        'name',
        'hourly_rate',
        'description',
        'start_date',
        'due_date',
        'owner_id',
        'procedure_id',
        'milestone_order',
        'task_priority_id',
        'partner_id',
        'task_status_id',
        'repeat_id',
        'recurring_type',
        'recurring',
        'is_infinite',
        'billable',
        'total_cycles',
        'taskable_type',
        'taskable_id',
        'visible_to_client',
        'is_file_needed',
    ];

    public const TASKABLE_PROJECT = 'project';

    public const TASKABLE_INVOICE = 'invoice';

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
        return $this->hasMany(TaskTimer::class)->orderBy('start_time', 'ASC');
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

    public function dependencies()
    {
        return $this->belongsToMany(self::class, 'task_dependencies', 'task_id', 'dependent_task_id');
    }

    public function dependentTasks()
    {
        return $this->belongsToMany(self::class, 'task_dependencies', 'dependent_task_id', 'task_id');
    }

    public function actions()
    {
        return $this->belongsToMany(Action::class, 'task_actions')->withPivot('is_completed');
    }

    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'fileable');
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

    public static function getMilestoneOrder($taskableId, $taskableType)
    {
        $latestTask = self::where('taskable_id', $taskableId)
            ->where('taskable_type', $taskableType)
            ->whereNotNull('milestone_order')
            ->orderBy('milestone_order', 'DESC')
            ->first();

        return $latestTask ? $latestTask->milestone_order + 1 : 0;
    }

    public static function getTaskableTypes(): array
    {
        return [
            'project' => [
                'resource' => ProjectResource::class,
                'load' => ['members'],
            ],
            'invoice' => [
                'resource' => InvoiceResource::class,
                'load' => [],
            ],
        ];
    }
}
