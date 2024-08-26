<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'id',
        'title',
        'body',
        'staff_devices_id',
        'is_seen',
        'is_archived'
    ];

    public function staffDevice()
    {
        return $this->belongsTo(StaffDevice::class, 'staff_devices_id');
    }
}
