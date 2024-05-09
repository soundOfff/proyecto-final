<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProcedureResource extends JsonResource
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
            'processId' => $this->process_id,
            'statusId' => $this->procedure_status_id,
            'stepNumber'=> $this->step_number,
            'name' => $this->name,
            'description' => $this->description,
            'process' => ProcessResource::make($this->whenLoaded('process')),
            'status' => ProcedureStatusResource::make($this->whenLoaded('status')),
            'responsible' => StaffResource::make($this->whenLoaded('responsible')),
        ];
    }
}
