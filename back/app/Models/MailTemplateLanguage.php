<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MailTemplateLanguage extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function mailTemplate()
    {
        return $this->hasMany(MailTemplate::class);
    }
}
