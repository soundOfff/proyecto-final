<?php

namespace App\Services;

use App\Mail\TemplateMailable;
use App\Models\MailTemplate;
use App\Models\Task;
use Illuminate\Support\Facades\Mail;

class MailTemplateService
{
    public function __construct(protected TableFieldService $tableFieldService)
    {
    }

    public function sendTemplate(string $to, Task $task, MailTemplate $template)
    {
        $body = $template->body;

        if ($template->isTaskGroup()) {
            foreach (Task::MAIL_TEMPLATE_FIELDS as $field) {
                $modelName = str_split($field, '-');

                $body = str_replace("{$field}", $task->author->{$field['field']}, $body);
            }
        }

        dd($body);

        Mail::to($to)->send(new TemplateMailable($body));
    }
}
