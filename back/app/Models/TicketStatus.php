<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketStatus extends Model
{
    use HasFactory;

    protected $guarded = [];

    private const IN_PROGRESS = 4;

    public static function getInProgress(): self
    {
        return self::find(self::IN_PROGRESS);
    }
}
