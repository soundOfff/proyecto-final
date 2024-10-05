<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    protected $fillable = [
        'fileable_id',
        'fileable_type',
        'url',
        'subject',
        'visible_to_customer',
        'is_file_needed',
    ];

    public function fileable(): BelongsTo
    {
        return $this->morphTo();
    }
}
