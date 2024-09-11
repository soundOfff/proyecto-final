<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Court extends Model
{
    protected $fillable = [
        'id',
        'number',
        'description',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
