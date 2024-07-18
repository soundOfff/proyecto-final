<?php

namespace Database\Seeders;

use App\Models\MailTemplate;
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
                'id' => 1,
                'mail_template_group_id' => 6,
                'name' => 'New task Assigned (Sent to Author)',
                'event' => 'task-assigned',
                'subject' => 'New task assigned to you - {task_name}',
                'send_from' => 'Velo Legal | Cases',
                'body' => 'Hi {task-author-name},<br><br>A new task has been assigned to you. Please check your dashboard for more details.<br><br><b>Task Name</b>: {task-name}<br><b>Due Date</b>: {task-due_date}<br><br><b>Priority</b>: {task-priority-name}<br><br>Thanks Velo Cases',
            ],
            [
                'id' => 2,
                'mail_template_group_id' => 6,
                'name' => 'Ticket Reply (Sent to Customer)',
                'event' => 'ticket-reply',
                'subject' => 'New ticket reply',
                'send_from' => 'Velo Legal | Cases',
                'body' => 'Hi {task-author-name},<br><br>A new task has been assigned to you. Please check your dashboard for more details.<br><br><b>Task Name</b>: {task-name}<br><b>Due Date</b>: {task-due_date}<br><br><b>Priority</b>: {task-priority-name}<br><br>Thanks Velo Cases',

            ],
            [
                'id' => 3,
                'mail_template_group_id' => 6,
                'name' => 'New Comment on Task (Sent to Staff)',
                'event' => 'new-comment-on-task',
                'subject' => 'New Comment on Task - {task_name}',
                'send_from' => 'Velo Legal | Cases',
                'body' => 'Hi {task-author-name},<br><br>A new task has been assigned to you. Please check your dashboard for more details.<br><br><b>Task Name</b>: {task-name}<br><b>Due Date</b>: {task-due_date}<br><br><b>Priority</b>: {task-priority-name}<br><br>Thanks Velo Cases',
            ],
            [
                'id' => 4,
                'mail_template_group_id' => 6,
                'name' => 'Task Deadline Reminder - Sent to Assigned Members',
                'event' => 'task-deadline-reminder',
                'subject' => 'Task Deadline Reminder',
                'send_from' => 'Velo Legal | Cases',
                'body' => 'Hi {task-author-name},<br><br>A new task has been assigned to you. Please check your dashboard for more details.<br><br><b>Task Name</b>: {task-name}<br><b>Due Date</b>: {task-due_date}<br><br><b>Priority</b>: {task-priority-name}<br><br>Thanks Velo Cases',
            ],
        ];

        foreach ($templates as $template) {
            MailTemplate::updateOrCreate(['id' => $template['id']], $template);
        }
    }
}
