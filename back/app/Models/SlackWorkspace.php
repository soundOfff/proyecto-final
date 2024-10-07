<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SlackWorkspace extends Model
{
    protected $fillable = [
        'slack_workspace_id',
        'name',
        'bot_token',
    ];

    public function staffs(): HasMany
    {
        return $this->hasMany(Staff::class);
    }
}
