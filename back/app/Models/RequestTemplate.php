<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestTemplate extends Model
{
    protected $fillable = [
        'name',
        'description',
        'fields',
        'json',
    ];
}
