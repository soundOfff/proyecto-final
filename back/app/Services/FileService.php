<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class FileService
{
    public function getPublicUrl(string $fileName): string
    {
        try {
            $url = Storage::drive('google')->url($fileName);

            preg_match('/id=([^&]*)/', $url, $matches);

            $id = $matches[1] ?? null;

            $publicUrl = "https://drive.google.com/file/d/$id/view?usp=sharing";

            return $publicUrl;
        } catch (\Exception $e) {
            return '';
        }
    }
}
