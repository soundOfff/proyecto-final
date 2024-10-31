<?php

namespace App\Http\Resources;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'note' => $this->note,
            'hourly_rate' => $this->hourly_rate,
            'start_date' => $this->start_date,
            'due_date' => $this->due_date,
            'priority' => $this->priority,
            'repeat_id' => $this->repeat_id,
            'recurring_type' => $this->recurring_type,
            'recurring' => $this->recurring,
            'is_infinite' => $this->is_infinite,
            'billable' => $this->billable,
            'total_cycles' => $this->total_cycles,
            'taskable_id' => $this->taskable_id,
            'taskable_type' => $this->taskable_type,
            'partner_id' => $this->partner_id,
            'status_id' => $this->task_status_id,
            'milestone_order' => $this->milestone_order,
            'description' => $this->description,
            'canChangeStatus' => $this->can_change_status,
            'is_file_needed' => $this->is_file_needed,
            'partner' => PartnerResource::make($this->whenLoaded('partner')),
            'total_time' => $this->getTotalTime(),
            'parsed_total_time' => $this->getParsedTotalTime(),
            'timers' => TaskTimerResource::collection($this->whenLoaded('timers')),
            'priority' => TaskPriorityResource::make($this->whenLoaded('priority')),
            'status' => TaskStatusResource::make($this->whenLoaded('status')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'comments' => TaskCommentResource::collection($this->whenLoaded('comments')),
            'checklistItems' => TaskChecklistItemResource::collection($this->whenLoaded('checklistItems')),
            'assigneds' => StaffResource::collection($this->whenLoaded('assigneds')),
            'followers' => StaffResource::collection($this->whenLoaded('followers')),
            'reminders' => ReminderResource::collection($this->whenLoaded('reminders')),
            'dependencies' => self::collection($this->whenLoaded('dependencies')),
            'requiredFields' => TaskRequiredFieldResource::collection($this->whenLoaded('requiredFields')),
            'author' => StaffResource::make($this->whenLoaded('author')),
            'procedure' => $this->procedure ? ProcedureResource::make($this->whenLoaded('procedure')->load('process.forks')) : null,
            'isFinalTask' => $this->isFinalTask(),
            'isBlocked' => $this->is_blocked,
            'filesCount' => $this->files_count,
            'treeVerticalLevel' => $this->tree_vertical_level,
            'taskable' => $this->whenLoaded('taskable', function () {
                $taskableTypes = Task::getTaskableTypes();
                $taskableType = $taskableTypes[$this->taskable_type] ?? null;

                return $taskableType
                    ? $taskableType['resource']::make($this->whenLoaded('taskable')->load($taskableType['load']))
                    : null;
            }),
            'actions' => ActionResource::collection($this->whenLoaded('actions')),
            'files' => FileResource::collection($this->whenLoaded('files')),
        ];
    }
}
