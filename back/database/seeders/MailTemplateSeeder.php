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
                'name' => 'New task Assigned (Sent to Staff)',
                'mail_template_group_id' => 6, // 'tasks'
                'event' => 'task-assigned',
                'subject' => 'New task assigned to you - {task_name}',
                'send_from' => 'Velo Legal | Cases',
                'body' => 'Hi {staff_name},<br><br>A new task has been assigned to you. Please check your dashboard for more details.<br><br><b>Task Name</b>: {task_name}<br><b>Due Date</b>: {due_date}<br><br><b>Priority</b>: {priority}<br><br>Thanks Velo Cases',
            ],
        ];

        foreach ($templates as $template) {
            MailTemplate::updateOrCreate(['id' => $template['id']], $template);
        }
    }
}
