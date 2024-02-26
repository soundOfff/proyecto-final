<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskChecklistItemResource extends JsonResource
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
            'description' => $this->description,
            'finished' => $this->finished,
            'finishedFrom' => $this->finished_from,
            'listOrder' => $this->list_order,
            'addedFrom' => $this->added_from,
            'task' => TaskResource::make($this->whenLoaded('task')),
        ];
    }
}
