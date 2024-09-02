<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaskPriority extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public const DEFAULT = 2;

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
