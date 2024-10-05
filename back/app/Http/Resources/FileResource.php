<?php

namespace App\Http\Resources;

use App\Services\FileService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
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
            'fileableId' => $this->fileable_id,
            'fileableType' => $this->fileable_type,
            'url' => $this->url,
            'publicUrl' => (new FileService)->getPublicUrl($this->url),
            'subject' => $this->subject,
            'visibleToCustomer' => $this->visible_to_customer,
            'isFileNeeded' => $this->is_file_needed,
            'fileable' => $this->whenLoaded('fileable'),
        ];
    }
}
