<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ActionType extends Model
{
    public const ACTION_EXPENSE = 'expense';

    public const ACTION_API = 'api';

    public const ACTION_MAIL = 'email';

    public function actions() : HasMany {
        return $this->hasMany(Action::class);
    }
}
