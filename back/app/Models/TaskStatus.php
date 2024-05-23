<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskStatus extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    public const IN_PROGRESS = 2;
    public const COMPLETED = 3;

    public static function getInProgress(): self
    {
        return self::find(self::IN_PROGRESS);
    }
}
