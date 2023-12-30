<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ExpenseRepeat extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'label',
        'days',
    ];

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
