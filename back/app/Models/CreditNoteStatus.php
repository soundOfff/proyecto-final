<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CreditNoteStatus extends Model
{
    protected $fillable = [
        'id',
        'label',
    ];

    public const OPEN = 1;

    public function creditNotes(): HasMany
    {
        return $this->hasMany(CreditNote::class);
    }
}
