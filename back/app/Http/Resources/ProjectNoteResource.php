<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectNoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'content' => $this->content,
            'staffId' => $this->staff_id,
            'project' => ProjectResource::make($this->whenLoaded('project')),
            'staff' => StaffResource::make($this->whenLoaded('staff')),
        ];
    }
}
