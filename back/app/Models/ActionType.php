<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ActionType extends Model
{
    public const ACTION_EXPENSE_ID = 1;

    public const ACTION_API_ID = 2;

    public const ACTION_MAIL_ID = 3;

    public function actions() : HasMany {
        return $this->hasMany(Action::class);
    }
}
