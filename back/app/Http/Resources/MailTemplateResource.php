<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MailTemplateResource extends JsonResource
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
            'event' => $this->event,
            'group' => MailTemplateGroupResource::make($this->whenLoaded('group')),
            'subject' => $this->subject,
            'send_from' => $this->send_from,
            'send_to' => $this->send_to,
            'disabled' => $this->disabled,
            'formatted' => $this->formatted,
            'body' => $this->body,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
