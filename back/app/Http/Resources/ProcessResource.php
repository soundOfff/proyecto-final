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
            'projectServiceTypeId' => $this->project_service_type_id,
            'stepQuantity' => $this->step_quantity,
            'realStepQuantity' => $this->procedures->count(),
            'name' => $this->name,
            'description' => $this->description,
            'createdAt' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'projectServiceType' => ProjectServiceTypeResource::make($this->whenLoaded('projectServiceType')),
            'procedures' => ProcedureResource::collection($this->whenLoaded('procedures')),
            'author' => StaffResource::make($this->whenLoaded('author')),
            'forks' => self::collection($this->whenLoaded('forks')),
            'allForks' => self::collection($this->whenLoaded('allForks')),
            'forkedFrom' => self::make($this->whenLoaded('forkedFrom')),
            'toNotify' => StaffResource::collection($this->whenLoaded('toNotify')),
        ];
    }
}
