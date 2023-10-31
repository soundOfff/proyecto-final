<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectStageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'startTimestamp' => $this->start_timestamp,
            'endTimestamp' => $this->end_timestamp,
            'project' => ProjectResource::make($this->whenLoaded('project')),
            'staff' => StaffResource::make($this->whenLoaded('staff')),
        ];
    }
}
