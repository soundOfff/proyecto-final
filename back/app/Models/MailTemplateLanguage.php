<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MailTemplateLanguage extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
    ];

    public function mailTemplate()
    {
        return $this->belongsTo(MailTemplate::class, 'mail_template_id');
    }
}
