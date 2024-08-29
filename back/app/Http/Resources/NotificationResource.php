<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
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
            'title' => $this->title,
            'body' => $this->body,
            'createdAt' => $this->created_at,
            'isSeen' => $this->is_seen,
            'isArchived' => $this->is_archived,
            'notifiableId' => $this->notifiable_id,
            'notifiableType' => $this->notifiable_type,
            'creator' => StaffResource::make($this->whenLoaded('creator')),
            'staff' => StaffResource::make($this->whenLoaded('staff')),
            'staffDevice' => StaffDeviceResource::make($this->whenLoaded('staffDevice')),
        ];
    }
}
