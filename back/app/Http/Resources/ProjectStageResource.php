<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
            'startTimestamp' => Carbon::parse($this->start_timestamp)->format('d-m-Y'),
            'endTimestamp' => Carbon::parse($this->end_timestamp)->format('d-m-Y'),
            'project' => ProjectResource::make($this->whenLoaded('project')),
            'staff' => StaffResource::make($this->whenLoaded('staff')),
        ];
    }
}
