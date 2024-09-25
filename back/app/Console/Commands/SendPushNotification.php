<?php

namespace App\Console\Commands;

use App\Models\Reminder;
use App\Models\Task;
use App\Models\TaskStatus;
use App\Services\NotificationService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SendPushNotification extends Command
{
    protected $signature = 'app:send-push-notification';

    protected $description = 'Send push notification to all staffs with device token';

    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        parent::__construct();

        $this->notificationService = $notificationService;
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

        Task::where('start_date', '=', Carbon::now()->format('Y-m-d'))
            ->where('is_owner_notified', false)
            ->with(['assigneds.devices'])
            ->each(function ($task) {
                $task->assigneds->each(function ($staff) use ($task) {
                    $staff->devices->each(function ($device) use ($task) {
                        $this->notificationService->sendWebPushNotification(
                            $device->device_token,
                            'Nueva Tarea: '.$task->name,
                            $task->author->first_name.' '.$task->author->last_name.' te ha asignado una nueva tarea '.$task->name,
                            $task->owner_id,
                            strtolower(class_basename(Task::class)),
                            $task->id
                        );
                    });
                });
                $task->update(['is_owner_notified' => true]);
            });

        foreach ($notifies as $notify) {
            $diffInMinutes = Carbon::now()->diffInMinutes(Carbon::parse($notify->reminder_date));
            if ($diffInMinutes == 0) {
                $this->notificationService->sendWebPushNotification($notify->device_token, $notify->task_name, $notify->description, $notify->staff_id, strtolower(class_basename(Task::class)), $notify->task_id, $notify->creator, $notify->priority_id);
                $this->notificationService->sendSlackNotification(staffId: $notify->staff_id, header: $notify->task_name, body: $notify->description);
                Reminder::find($notify->reminder_id)->update(['is_notified' => true]);
            }
        }
    }
}
