<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PartnerType extends Model
{
    public const RESPONSIBLE = 1;

    public const PRESIDENT = 2;

    public const SECRETARY = 3;

    public const DIRECTOR = 4;

    public const OWNER = 5;
}
