<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = [
        'id',
        'notable_id',
        'notable_type',
        'description',
    ];

    public function notable()
    {
        return $this->morphTo();
    }
}
