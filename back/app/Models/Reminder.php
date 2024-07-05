<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Reminder extends Model
{
    protected $fillable = [
        'id',
        'staff_id',
        'creator',
        'date',
        'description',
        'is_notified',
        'reminderable_id',
        'reminderable_type',
    ];

    public function reminderable(): MorphTo
    {
        return $this->morphTo();
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }
}
