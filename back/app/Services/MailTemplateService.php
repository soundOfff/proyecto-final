<?php

namespace App\Services;

use App\Mail\TemplateMailable;
use App\Models\MailTemplate;
use App\Models\Task;
use Illuminate\Support\Facades\Mail;

class MailTemplateService
{
    public function sendTemplate(string $to, Task $task, MailTemplate $template)
    {
        $body = $template->body;

        if ($template->isTaskGroup()) {
            $body = str_replace('{task_name}', $task->name, $body);
            $body = str_replace('{due_date}', $task->due_date, $body);
            $body = str_replace('{priority}', $task->priority->name, $body);
            $body = str_replace('{staff_name}', $task->author->first_name.' '.$task->author->last_name, $body);
        }

        Mail::to($to)->send(new TemplateMailable($body));
    }
}
