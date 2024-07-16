<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MailTemplateGroup extends Model
{
    protected $fillable = [
        'id',
        'name',
        'slug',
    ];

    const TASK_ID = 6;

    public function mailTemplates()
    {
        return $this->belongsToMany(MailTemplate::class, 'group_mail_template', 'group_id', 'mail_template_id');
    }
}
