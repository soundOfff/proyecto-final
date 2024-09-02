<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NotificationPriority extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'label'];

    public const DEFAULT = 1;

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }
}
