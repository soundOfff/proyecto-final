<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'item_group_id',
        'description',
        'long_description',
        'rate',
        'tax',
        'tax2',
        'unit',
    ];
}
