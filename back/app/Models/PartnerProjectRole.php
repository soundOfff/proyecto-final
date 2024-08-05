<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PartnerProjectRole extends Model
{
    protected $fillable = [
        'id',
        'name',
        'label',
    ];

    public const DEFENDANT = 1;

    public const PLAINTIFF = 2;

    public function partnerProject(): HasMany
    {
        return $this->hasMany(PartnerProject::class);
    }
}
