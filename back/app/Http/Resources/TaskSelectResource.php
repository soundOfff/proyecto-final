<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskSelectResource extends JsonResource
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
            'name' => "#$this->id | $this->name",
            'taskable_id' => $this->taskable_id,
            'taskable_type' => $this->taskable_type,
            'milestone_order' => $this->milestone_order,
        ];
    }
}
