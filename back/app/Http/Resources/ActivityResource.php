<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{
    public static function getResourceNames(): array
    {
        return [
            'task' => [
                'resource' => TaskResource::class,
                'load' => [],
            ],
            'staff' => [
                'resource' => StaffResource::class,
                'load' => [],
            ],
        ];
    }

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'subjectId' => $this->subject_id,
            'subjectType' => $this->subject_id,
            'causerId' => $this->caused_id,
            'causerType' => $this->caused_type,
            'properties' => json_decode($this->properties),
            'updatedAt' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
            'subject' => $this->whenLoaded('subject', function () {
                $resourceNames = self::getResourceNames();
                $resource = $resourceNames[$this->subject_type] ?? null;

                if (! $resource) {
                    return null;
                }

                return $resource['resource']::make($this->whenLoaded('subject'));
            }),
            'causer' => $this->whenLoaded('causer', function () {
                $resourceNames = self::getResourceNames();
                $resource = $resourceNames[$this->causer_type] ?? null;

                if (! $resource) {
                    return null;
                }

                return $resource['resource']::make($this->whenLoaded('causer'));
            }),
        ];
    }
}
