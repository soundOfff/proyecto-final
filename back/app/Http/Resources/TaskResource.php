<?php

namespace App\Http\Resources;

use App\Models\TaskTimer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'hourly_rate' => $this->hourly_rate,
            'start_date' => $this->start_date,
            'partner_id' => $this->partner_id,
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
            'statusId' => $this->task_status_id,
            'description' => $this->description,
            'currentTimer' => TaskTimerResource::make($this->whenLoaded('currentTimer')),
            'timers' => TaskTimerResource::collection($this->whenLoaded('timers')),
            'priority' => TaskPriorityResource::make($this->whenLoaded('priority')),
            'status' => TaskStatusResource::make($this->whenLoaded('status')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'comments' => TaskCommentResource::collection($this->whenLoaded('comments')),
            'checklistItems' => TaskChecklistItemResource::collection($this->whenLoaded('checklistItems')),
            'assigneds' => StaffResource::collection($this->whenLoaded('assigneds')),
            'followers' => StaffResource::collection($this->whenLoaded('followers')),
            'reminders' => ReminderResource::collection($this->whenLoaded('reminders')),
            'taskable' => $this->whenLoaded('taskable', function () {
                return $this->taskable_type === 'project'
                    ? ProjectResource::make($this->whenLoaded('taskable'))->load('members.staff')
                    : null;
            }),
        ];
    }
}
