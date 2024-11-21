<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Procedure extends Model
{
    protected $fillable = [
        'id',
        'process_id',
        'procedure_status_id',
        'author_id',
        'is_conditional',
        'step_number',
        'name',
        'description',
        'responsible',
    ];

    public function process(): BelongsTo
    {
        return $this->belongsTo(Process::class);
    }

    public function task(): HasOne
    {
        return $this->hasOne(Task::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(ProcedureStatus::class, 'procedure_status_id');
    }

    public function actions()
    {
        return $this->hasMany(Action::class);
    }

    public function dependencies()
    {
        return $this->belongsToMany(self::class, 'procedure_dependencies', 'procedure_id', 'dependent_procedure_id');
    }

    public function dependant()
    {
        return $this->belongsToMany(self::class, 'procedure_dependencies', 'dependent_procedure_id', 'procedure_id');
    }

    public function author()
    {
        return $this->belongsTo(Staff::class, 'author_id');
    }

    public function reminders(): MorphMany
    {
        return $this->morphMany(Reminder::class, 'reminderable');
    }

    public function isConditional(): bool
    {
        // a procedure is conditional if is the last of the process and the process who is belong has forks
        return $this->process->forks->isNotEmpty() && $this->step_number == $this->process->procedures->count();
    }

    /**
     * Convert a procedure to a task and traverse the path until reach a conditional procedure
     *
     * @param Project $project
     * @param int $staff_id
     * @param array $createdTasks
     */
    public function traversePath(Project $project, int $staff_id, array &$createdTasks, self|null $parent = null): void
    {
        $task = $this->convertToTask($project, $staff_id, $parent);
        if ($task) {
            $createdTasks[] = $task;
        }

        $this->load('outgoingPaths');

        foreach ($this->outgoingPaths as $path) {
            if ($path->toProcedure->is_conditional) {
                $path->toProcedure->convertToTask($project, $staff_id, $parent);
                continue;
            }

            $path->toProcedure->traversePath($project, $staff_id, $createdTasks, $this);
        }
    }

    public function convertToTask(Project $project, int $staff_id, self|null $parent): ?Task
    {
        // TODO: Check if with nested conditional procedures this works...
        $taskQuery = Task::where('procedure_id', $this->id)
            ->where('taskable_id', $project->id)
            ->where('taskable_type', Task::TASKABLE_PROJECT);

        $taskExists = $taskQuery->exists();

        if ($taskExists && $this->isBackEdgeCase($parent)) {
            $taskQuery->update(['task_status_id' => TaskStatus::PENDING]);

            return $taskQuery->first();
        }

        if ($taskExists && $this->isRedundantCase($parent)) {
            return null;
        }

        $latestMilestoneOrder = Task::getLatestMilestoneOrder($project->id, Task::TASKABLE_PROJECT);

        $task = Task::create([
            'procedure_id' => $this->id,
            'task_priority_id' => TaskPriority::DEFAULT,
            'repeat_id' => ExpenseRepeat::DEFAULT,
            'task_status_id' => TaskStatus::PENDING,
            'taskable_id' => $project->id,
            'taskable_type' => Task::TASKABLE_PROJECT,
            'partner_id' => $project->billable_partner_id,
            'owner_id' => $project->responsible_person_id,
            'author_id' => $staff_id,
            'start_date' => now(),
            'description' => $this->description,
            'name' => $this->name,
            'milestone_order' => $latestMilestoneOrder == 0 ? $this->step_number : $latestMilestoneOrder + 1, // Next milestone order,
        ]);

        $this->load('dependencies');
        if ($this->dependencies->isNotEmpty()) {
            $procedureDependencies = $this->dependencies->pluck('id');
            $tasksId = $procedureDependencies->map(
                fn ($id) => Task::where('procedure_id', $id)
                    ->where('taskable_id', $project->id)
                    ->where('taskable_type', Task::TASKABLE_PROJECT)
                    ->first()->id
            )->toArray();
            $task->dependencies()->sync($tasksId);
        }

        $this->load('actions');
        if ($this->actions->isNotEmpty()) {
            $actions = $this->actions->makeHidden('id')->toArray();
            $task->actions()->createMany($actions);
        }

        return $task;
    }

    private function isBackEdgeCase($parent): bool
    {
        return $parent && $parent->id > $this->id;
    }

    private function isRedundantCase($parent): bool
    {
        return (! $parent) || ($parent && $parent->id <= $this->id);
    }

    public function outgoingPaths()
    {
        return $this->hasMany(ProcedurePath::class, 'from_procedure_id');
    }

    public function incomingPaths()
    {
        return $this->hasMany(ProcedurePath::class, 'to_procedure_id');
    }
}
