<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Permission extends Model
{
    protected $fillable = [
        'id',
        'name',
        'label',
    ];

    public function Contact(): BelongsToMany
    {
        return $this->belongsToMany(Contact::class);
    }

    public function Staff(): BelongsToMany
    {
        return $this->belongsToMany(Staff::class);
    }
}
