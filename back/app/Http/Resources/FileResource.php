<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class FileResource extends JsonResource
{
    private function getPublicUrl(): string
    {
        $url = Storage::drive('google')->url($this->url);

        preg_match('/id=([^&]*)/', $url, $matches);

        $id = $matches[1] ?? null;

        return "https://drive.google.com/file/d/$id/view?usp=sharing";
    }

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
            'publicUrl' => $this->getPublicUrl(),
            'subject' => $this->subject,
            'visibleToCustomer' => $this->visible_to_customer,
        ];
    }
}
