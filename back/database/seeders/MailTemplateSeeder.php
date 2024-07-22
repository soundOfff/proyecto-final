<?php

namespace Database\Seeders;

use App\Models\MailTemplate;
use App\Models\MailTemplateLanguage;
use Illuminate\Database\Seeder;

class MailTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $templates = [
            [
                'mail_template_group_id' => 6,
                'name' => 'New task Assigned (Sent to Author)',
                'event' => 'task-assigned',
                'send_from' => 'Velo Legal | Cases',
                'subject' => 'New task assigned to you - {task_name}',
                'body' => 'Hi {task-author-name},<br><br>A new task has been assigned to you. Please check your dashboard for more details.<br><br><b>Task Name</b>: {task-name}<br><b>Due Date</b>: {task-due_date}<br><br><b>Priority</b>: {task-priority-name}<br><br>Thanks Velo Cases',
            ],
            [
                'mail_template_group_id' => 6,
                'name' => 'Ticket Reply (Sent to Customer)',
                'event' => 'ticket-reply',
                'send_from' => 'Velo Legal | Cases',
                'subject' => 'New ticket reply',
                'body' => 'Hi {task-author-name},<br><br>A new task has been assigned to you. Please check your dashboard for more details.<br><br><b>Task Name</b>: {task-name}<br><b>Due Date</b>: {task-due_date}<br><br><b>Priority</b>: {task-priority-name}<br><br>Thanks Velo Cases',
            ],
            [
                'mail_template_group_id' => 6,
                'name' => 'New Comment on Task (Sent to Staff)',
                'event' => 'new-comment-on-task',
                'send_from' => 'Velo Legal | Cases',
                'subject' => 'New Comment on Task - {task_name}',
                'body' => 'Hi {task-author-name},<br><br>A new task has been assigned to you. Please check your dashboard for more details.<br><br><b>Task Name</b>: {task-name}<br><b>Due Date</b>: {task-due_date}<br><br><b>Priority</b>: {task-priority-name}<br><br>Thanks Velo Cases',
            ],
            [
                'mail_template_group_id' => 6,
                'name' => 'Task Deadline Reminder - Sent to Assigned Members',
                'event' => 'task-deadline-reminder',
                'send_from' => 'Velo Legal | Cases',
                'subject' => 'Task Deadline Reminder',
                'body' => 'Hi {task-author-name},<br><br>A new task has been assigned to you. Please check your dashboard for more details.<br><br><b>Task Name</b>: {task-name}<br><b>Due Date</b>: {task-due_date}<br><br><b>Priority</b>: {task-priority-name}<br><br>Thanks Velo Cases',
            ],
        ];

        foreach ($templates as $template) {
            foreach (MailTemplateLanguage::all() as $lang) {
                $template['lang_id'] = $lang->id;
                if ($template['lang_id'] != 1) { // Only seed on en template
                    $template['body'] = "";
                }
                MailTemplate::updateOrCreate($template);
            }
        }
    }
}
