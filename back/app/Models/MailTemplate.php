<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MailTemplate extends Model
{
    protected $fillable = [
        'id',
        'name',
        'event',
        'subject',
        'send_from',
        'lang_id',
        'send_to',
        'mail_template_group_id',
        'body',
        'formatted',
        'disabled',
    ];

    public function group()
    {
        return $this->belongsTo(MailTemplateGroup::class, 'mail_template_group_id');
    }

    public function lang()
    {
        return $this->belongsTo(MailTemplateLanguage::class, 'lang_id');
    }
}
