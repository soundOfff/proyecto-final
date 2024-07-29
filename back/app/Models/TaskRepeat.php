<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaskRepeat extends Model
{
    use HasFactory;

    public const CUSTOM = 8;

    public const DEFAULT = 1;

    protected $fillable = [
        'id',
        'label',
        'days',
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public static function isCustom(int|null $id): bool
    {
        return self::find(self::CUSTOM)->id === $id;
    }
}
