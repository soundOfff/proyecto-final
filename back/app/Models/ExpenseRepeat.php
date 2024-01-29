<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ExpenseRepeat extends Model
{
    use HasFactory;

    private const CUSTOM = 8;

    protected $fillable = [
        'id',
        'label',
        'days',
    ];

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    public static function isCustom(int|null $id): bool
    {
        return self::find(self::CUSTOM)->id === $id;
    }
}
