<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProcessResource extends JsonResource
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
            'projectId' => $this->project_id,
            'stepQuantity' => $this->step_quantity,
            'name' => $this->name,
            'description' => $this->description,
            'department' => $this->department,
            'createdAt' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'projectServiceType' => ProjectServiceTypeResource::make($this->whenLoaded('projectServiceType')),
            'procedures' => ProcedureResource::collection($this->whenLoaded('procedures')),
            'author' => StaffResource::make($this->whenLoaded('author')),
        ];
    }
}
