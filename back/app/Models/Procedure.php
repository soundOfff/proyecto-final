<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Procedure extends Model
{
    protected $fillable = [
        'id',
        'process_id',
        'procedure_status_id',
        'responsible_id',
        'step_number',
        'name',
        'description',
    ];

    public function process(): BelongsTo
    {
        return $this->belongsTo(Process::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(ProcedureStatus::class, 'procedure_status_id');
    }

    public function responsible(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'responsible_id');
    }

    public function convertToTask($projectId, $partnerId, $responsiblePersonId): Task | null
    {
        $isAlreadyCreated = Task::where('procedure_id', $this->id)
            ->where('taskable_id', $projectId)
            ->where('taskable_type', Task::TASKABLE_PROJECT)
            ->exists();

        if ($isAlreadyCreated) return null;

        
        return Task::create([
            'procedure_id' => $this->id,
            'task_priority_id' => TaskPriority::DEFAULT,
            'repeat_id' => ExpenseRepeat::DEFAULT,
            'task_status_id' => TaskStatus::IN_PROGRESS,
            'taskable_id' => $projectId,
            'taskable_type' => Task::TASKABLE_PROJECT,
            'partner_id' => $partnerId,
            'owner_id' => $responsiblePersonId,
            'start_date' => now(),
            'description' => $this->description,
            'name' => $this->name,
            'milestone_order' => $this->step_number,
        ]);
    }
}
