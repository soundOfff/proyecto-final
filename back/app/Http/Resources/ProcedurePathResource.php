<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProcedurePathResource extends JsonResource
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
            'fromProcedureId' => $this->from_procedure_id,
            'toProcedureId' => $this->to_procedure_id,
            'fromProcedure' => ProcedureResource::make($this->whenLoaded('fromProcedure')),
            'toProcedure' => ProcedureResource::make($this->whenLoaded('toProcedure')),
            'conditional' => $this->conditional,
        ];
    }
}
