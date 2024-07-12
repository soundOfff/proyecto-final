<?php

namespace App\Models;

use App\Http\Resources\InvoiceResource;
use App\Http\Resources\ProjectResource;
use App\Observers\TaskObserver;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

#[ObservedBy([TaskObserver::class])]
class Task extends Model
{
    use LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->logOnly([
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
            'author_id',
            'recurring_type',
            'recurring',
            'is_infinite',
            'billable',
            'total_cycles',
            'taskable_type',
            'taskable_id',
            'visible_to_client',
            'is_file_needed',
        ])
        ->logOnlyDirty();
    }

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
        'author_id',
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

    protected $appends = ['can_change_status'];

    protected function canChangeStatus(): Attribute
    {
        return new Attribute(
            get: fn () => (($this->files->count() > 0 && $this->is_file_needed) || ! $this->is_file_needed)
                && $this->requiredFields->every(
                    fn (TaskRequiredField $requiredField) => isset($this->taskable[$requiredField->field]) && $this->taskable instanceof Project
                )
        );
    }

    public function procedure()
    {
        return $this->belongsTo(Procedure::class);
    }

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

    public function author()
    {
        return $this->belongsTo(Staff::class, 'author_id');
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

    public function reminders(): MorphMany
    {
        return $this->morphMany(Reminder::class, 'reminderable');
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
        return $this->hasMany(Action::class);
    }

    public function isFinalTask()
    {
        if (! $this->procedure) {
            return false;
        }

        $relatedProcedures = $this->procedure->process->procedures->sortByDesc('step_number');

        return $relatedProcedures->first()->id === $this->procedure->id;
    }

    // If logic is needed, uncomment this method
    // public function finalTask() {
    //     $latestTask = self::where('taskable_id', $this->taskable_id)
    //         ->where('taskable_type', $this->taskable_type)
    //         ->whereNotNull('milestone_order')
    //         ->orderBy('milestone_order', 'DESC')
    //         ->first();

    //     return $latestTask;
    // }

    public function requiredFields()
    {
        return $this->hasMany(TaskRequiredField::class);
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

    public static function getLatestMilestoneOrder($taskableId, $taskableType)
    {
        $latestTask = self::where('taskable_id', $taskableId)
            ->where('taskable_type', $taskableType)
            ->whereNotNull('milestone_order')
            ->orderBy('milestone_order', 'DESC')
            ->first();

        return $latestTask ? $latestTask->milestone_order : 0;
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
