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
        'send_to',
        'mail_template_group_id',
        'body',
        'formatted',
        'disabled',
    ];

    public function isTaskGroup()
    {
        return $this->groups->contains('id', MailTemplateGroup::TASK_ID);
    }

    public function groups()
    {
        return $this->belongsToMany(MailTemplateGroup::class, 'group_mail_template', 'mail_template_id', 'group_id');
    }
}
