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
        return $this->hasMany(MailTemplate::class, 'mail_template_group_id');
    }
}
