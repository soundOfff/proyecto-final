<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProposalStatus extends Model
{
    protected $fillable = [
        'id',
        'label',
    ];

    public const ACCEPTED = 6;

    public function proposals(): HasMany
    {
        return $this->hasMany(Proposal::class);
    }
}
