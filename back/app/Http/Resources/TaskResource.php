<?php

namespace App\Http\Resources;

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
            'name' => $this->name,
            'hourly_price' => $this->hourly_price,
            'start_date' => $this->start_date,
            'due_date' => $this->due_date,
            'priority' => $this->priority,
            'repeat_id' => $this->repeat_id,
            'recurring_type' => $this->recurring_type,
            'recurring' => $this->recurring,
            'is_infinite' => $this->is_infinite,
            'billable' => $this->billable,
            'total_cycles' => $this->total_cycles,
            'taskable_type' => $this->taskable_type,
            'taskable_id' => $this->taskable_id,
            'tags' => $this->tags,
            'description' => $this->description,
        ];
    }
}
