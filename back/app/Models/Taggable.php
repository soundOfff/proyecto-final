<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Taggable extends Model
{
    protected $fillable = [
        'taggable_id',
        'taggable_type',
        'tag_id',
        'tag_order',
    ];

    public function taggable()
    {
        return $this->morphTo();
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }
}
