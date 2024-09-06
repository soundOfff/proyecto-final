<?php

namespace App\Console\Commands;

use App\Models\Reminder;
use App\Models\Task;
use App\Models\TaskStatus;
use App\Services\FcmService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SendPushNotification extends Command
{
    protected $signature = 'app:send-push-notification';

    protected $description = 'Send push notification to all staffs with device token';

    protected $fcmService;

    public function __construct(FcmService $fcmService)
    {
        parent::__construct();

        $this->fcmService = $fcmService;
    }

    public function handle()
    {
        $notifies = DB::table('reminders')
            ->select(
                'reminders.id as reminder_id',
                'reminders.creator as creator',
                'reminders.date as reminder_date',
                'reminders.notification_priority_id as priority_id',
                'reminders.description as description',
                'staff.id as staff_id',
                'tasks.id as task_id',
                'tasks.name as task_name',
                'staff_devices.device_token as device_token',
            )
            ->join('staff', 'reminders.staff_id', '=', 'staff.id')
            ->join('staff_devices', 'staff.id', '=', 'staff_devices.staff_id')
            ->join('tasks', function ($join) {
                $join
                    ->on('reminders.reminderable_id', '=', 'tasks.id')
                    ->on('reminders.reminderable_type', '=', DB::raw('"task"'));
            })
            // ->where('reminders.is_notified', false)
            ->where('tasks.task_status_id', '!=', TaskStatus::COMPLETED)
            ->get();

        $dailyTasks = DB::table('tasks')
            ->selectRaw(
                'tasks.id as task_id,
                tasks.name as task_name,
                tasks.description as description,
                tasks.owner_id as owner_id,
                owner.id as staff_id,
                CONCAT(author.first_name, " ", author.last_name) as author_name,
                staff_devices.device_token as device_token,
                staff_devices.staff_id'
            )
            ->join('staff as owner', 'tasks.owner_id', '=', 'owner.id')
            ->join('staff as author', 'tasks.author_id', '=', 'author.id')
            ->join('staff_devices', 'owner.id', '=', 'staff_devices.staff_id')
            ->where('tasks.is_owner_notified', false)
            ->where('tasks.start_date', '=', Carbon::now()->format('Y-m-d'))
            ->get();

        foreach ($dailyTasks as $dailyTask) {
            $this->fcmService->sendNotification(
                $dailyTask->device_token,
                "Nueva Tarea: " . $dailyTask->task_name,
                $dailyTask->author_name . " te ha asignado una nueva tarea " . $dailyTask->task_name,
                $dailyTask->owner_id,
                strtolower(class_basename(Task::class)),
                $dailyTask->task_id
            );
            Task::find($dailyTask->task_id)->update(['is_owner_notified' => true]);
        }

        foreach ($notifies as $notify) {
            $diffInMinutes = Carbon::now()->diffInMinutes(Carbon::parse($notify->reminder_date));
            if ($diffInMinutes == 0) {
                $this->fcmService->sendNotification($notify->device_token, $notify->task_name, $notify->description, $notify->staff_id, strtolower(class_basename(Task::class)), $notify->task_id, $notify->creator, $notify->priority_id);
                Reminder::find($notify->reminder_id)->update(['is_notified' => true]);
            }
        }
    }
}
