<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReminderResource extends JsonResource
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
            'staff_id' => $this->staff_id,
            'date' => $this->date,
            'description' => $this->description,
            'is_notified' => $this->is_notified,
            'staff' => StaffResource::make($this->whenLoaded('staff')),
            'creator' => StaffResource::make($this->whenLoaded('creator')),
            'reminderable_id' => $this->reminderable_id,
            'reminderable_type' => $this->reminderable_type,
            'reminderable' => $this->whenLoaded('reminderable', function () {
                return $this->reminderable_type === 'task'
                    ? TaskResource::make($this->reminderable)
                    : null;
            }),
        ];
    }
}
