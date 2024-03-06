<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskTimerResource extends JsonResource
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
            'task_id' => $this->task_id,
            'staff_id' => $this->staff_id,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'hourly_rate' => $this->hourly_rate,
            'note' => $this->note,
        ];
    }
}
