<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    protected $fillable = [
        'id',
        'label',
        'last_login',
        'last_logout',
        'ip_address',
        'staff_id',
    ];
}
