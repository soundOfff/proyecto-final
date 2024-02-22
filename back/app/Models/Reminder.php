<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reminder extends Model
{
    use HasFactory;

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

    public function estimates(): HasMany
    {
        return $this->hasMany(Estimate::class);
    }
}
