<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActionResource extends JsonResource
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
            'name' => $this->name,
            'description' => $this->description,
            'label' => $this->label,
            'action_type_id' => $this->action_type_id,
            'is_dispatched' => $this->is_dispatched,
            'mail_to' => $this->mail_to,
            'mail_template_id' => $this->mail_template_id,
            'request_template_id' => $this->request_template_id,
            'type' => ActionTypeResource::make($this->whenLoaded('type')),
            'tasks' => TaskResource::collection($this->whenLoaded('tasks')),
            'procedures' => ProcedureResource::collection($this->whenLoaded('procedures')),
            'requestTemplate' => RequestTemplateResource::make($this->whenLoaded('requestTemplate')),
        ];
    }
}
