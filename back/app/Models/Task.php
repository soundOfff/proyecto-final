<?php

namespace App\Models;

use App\Http\Resources\InvoiceResource;
use App\Http\Resources\ProjectResource;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Notifications\Slack\BlockKit\Blocks\SectionBlock;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

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
        'is_owner_notified',
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

    public static $MAIL_TEMPLATE_ALLOWED_FIELDS = ['name', 'start_date', 'description', 'due_date', 'hourly_rate', 'milestone_order'];

    public const TASKABLE_PROJECT = 'project';

    public const TASKABLE_INVOICE = 'invoice';

    protected $appends = ['can_change_status', 'is_blocked', 'files_count', 'tree_vertical_level'];

    protected function canChangeStatus(): Attribute
    {
        return new Attribute(
            get: fn () => (($this->files->count() > 0 && $this->is_file_needed) || ! $this->is_file_needed)
                && $this->requiredFields->every(
                    fn (TaskRequiredField $requiredField) => isset($this->taskable[$requiredField->field]) && $this->taskable instanceof Project
                )
        );
    }

    protected function isBlocked(): Attribute
    {
        return new Attribute(
            get: fn () => $this->dependencies->contains(fn (self $task) => $task->task_status_id !== TaskStatus::COMPLETED)
        );
    }

    protected function treeVerticalLevel(): Attribute
    {
        return new Attribute(
            get: function () {
                $level = 0;
                $task = $this;
                while ($task->dependencies->isNotEmpty()) {
                    $level++;
                    $task = $task->dependencies->first();
                }

                return $level;
            }
        );
    }

    public function filesCount(): Attribute
    {
        return new Attribute(
            get: fn () => $this->files->count()
        );
    }

    public function procedure(): BelongsTo
    {
        return $this->belongsTo(Procedure::class);
    }

    public function taskable(): MorphTo
    {
        return $this->morphTo();
    }

    public function project(): MorphTo
    {
        return $this->morphTo(Project::class, 'taskable_type', 'taskable_id');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    public function priority(): BelongsTo
    {
        return $this->belongsTo(TaskPriority::class, 'task_priority_id');
    }

    public function repeat(): BelongsTo
    {
        return $this->belongsTo(TaskRepeat::class, 'repeat_id');
    }

    public function timers()
    {
        return $this->hasMany(TaskTimer::class)->orderBy('start_time', 'ASC');
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(TaskStatus::class, 'task_status_id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'author_id');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'owner_id');
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

    public function notifications(): MorphMany
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }

    public function isFinalTask()
    {
        if (! $this->procedure) {
            return false;
        }

        $relatedProcedures = $this->procedure->process->procedures->sortByDesc('step_number');

        return $relatedProcedures->first()->id === $this->procedure->id;
    }

    public function requiredFields()
    {
        return $this->hasMany(TaskRequiredField::class);
    }

    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function getParsedTotalTime()
    {
        if ($this->timers->isEmpty()) {
            return null;
        }

        $startDate = $this->timers->first()->start_time ?: null;
        $endDate = $this->timers->last()->end_time ?: null;

        return Carbon::parse($startDate)->diff($endDate)->format('%H:%I');
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

    public function getSlackNotificationBlocks(SectionBlock $block): void
    {
        $name = $this->name;
        $description = $this->description ?: '-';
        $hourlyRate = $this->hourly_rate ?: '0';
        $startDate = $this->start_date ? Carbon::parse($this->start_date)->format('Y-m-d') : '-';
        $dueDate = $this->due_date ? Carbon::parse($this->due_date)->format('Y-m-d') : '-';
        $priorityName = $this->priority ? $this->priority->name : '-';
        $statusName = $this->status ? $this->status->name : '-';
        $checklistItems = $this->checklistItems->implode('description', " \n ");
        $comments = $this->comments->implode('content', " \n ");
        $assigneds = $this->assigneds->implode('name', " \n ");

        $block->text("*Nombre:* $name\n*Descripción:* $description\n *Prioridad:* $priorityName\n *Estado:* $statusName\n\n *Quehaceres:*\n $checklistItems\n\n *Comentarios:*\n $comments\n\n")->markdown();
        $block->field("*Fecha de inicio:* $startDate")->markdown();
        $block->field("*Fecha de finalización:* $dueDate")->markdown();
        $block->field("*Precio por hora:* $hourlyRate")->markdown();
        $block->field("*Asignados:* $assigneds")->markdown();
    }

    public function calculateCost(){

        return $this->timers()
            ->join('staff', 'task_timers.staff_id', '=', 'staff.id')
            ->selectRaw('SUM(TIMESTAMPDIFF(HOUR, task_timers.start_time, task_timers.end_time) * staff.hourly_rate) as total')
            ->value('total') ?? 0;

    }

}
