<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Country extends Model
{
    protected $fillable = [
        'calling_code',
        'cctld',
        'iso2',
        'iso3',
        'long_name',
        'num_code',
        'short_name',
        'un_member',
    ];

    const PANAMA_ID = 172;

    public static function panama(): self
    {
        return self::find(self::PANAMA_ID);
    }

    public function partners(): HasMany
    {
        return $this->hasMany(Partner::class);
    }
}
