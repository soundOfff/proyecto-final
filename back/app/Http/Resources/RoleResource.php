<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'permissions' => $this->permissions,
            'projects' => ProjectResource::collection($this->whenLoaded('project')),
            'staffs' => StaffResource::collection($this->whenLoaded('staffs')),
            'users' => UserResource::collection($this->whenLoaded('users')),
        ];
    }
}
