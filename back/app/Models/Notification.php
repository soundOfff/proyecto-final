<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'title',
        'body',
        'staff_devices_id',
        'created_by',
        'staff_id',
        'is_seen',
        'is_archived',
        'notifiable_id',
        'notifiable_type'
    ];

    public function staffDevice()
    {
        return $this->belongsTo(StaffDevice::class, 'staff_devices_id');
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function creator()
    {
        return $this->belongsTo(Staff::class, 'created_by');
    }

    public function notifiable(): MorphTo
    {
        return $this->morphTo();
    }
}
