<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Notification extends Model
{
    protected $fillable = [
        'id',
        'title',
        'body',
        'staff_devices_id',
        'is_seen',
        'is_archived',
        'notifiable_id',
        'notifiable_type'
    ];

    public function staffDevice()
    {
        return $this->belongsTo(StaffDevice::class, 'staff_devices_id');
    }

    public function notifiable(): MorphTo
    {
        return $this->morphTo();
    }
}
