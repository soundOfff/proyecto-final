<?php

namespace App\Http\Resources;

use App\Models\TaskPriority;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskCommentResource extends JsonResource
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
            'content' => $this->content,
            'task_id' => $this->task_id,
            'staff_id' => $this->staff_id,
            'task' => TaskResource::make($this->whenLoaded('task')),
            'staff' => StaffResource::make($this->whenLoaded('staff')),
            'contact' => ContactResource::make($this->whenLoaded('contact')),
            'file' => null,
        ];
    }
}
