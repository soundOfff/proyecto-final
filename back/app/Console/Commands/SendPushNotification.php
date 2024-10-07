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

        $reminders = DB::table('reminders')
            ->join('staff', 'reminders.staff_id', '=', 'staff.id')
            ->join('tasks', function ($join) {
                $join
                    ->on('reminders.reminderable_id', '=', 'tasks.id')
                    ->on('reminders.reminderable_type', '=', DB::raw('"task"'));
            })
            // ->where('reminders.is_notified', false)
            ->where('tasks.task_status_id', '!=', TaskStatus::COMPLETED);

        $staffs = $reminders->select(
            'staff.id as staff_id',
            'tasks.id as task_id',
            'tasks.name as task_name',
            'reminders.description as description',
            'reminders.date as reminder_date',
        )->get();

        $devices = $reminders->join('staff_devices', 'staff.id', '=', 'staff_devices.staff_id')
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
            ->get();

        foreach ($staffs as $staff) {
            $diffInMinutes = Carbon::now()->diffInMinutes(Carbon::parse($staff->reminder_date));
            if ($diffInMinutes == 0) {
                $this->notificationService->sendSlackNotification(staffId: $staff->staff_id, header: $staff->task_name, body: $staff->description, url: "/tasks?taskId={$staff->task_id}", modelId: $staff->task_id, modelType: Task::class);
            }
        }

        foreach ($devices as $device) {
            $diffInMinutes = Carbon::now()->diffInMinutes(Carbon::parse($device->reminder_date));
            if ($diffInMinutes == 0) {
                $this->notificationService->sendWebPushNotification($device->device_token, $device->task_name, $device->description, $device->staff_id, strtolower(class_basename(Task::class)), $device->task_id, $device->creator, $device->priority_id);
                Reminder::find($device->reminder_id)->update(['is_notified' => true]);
            }
        }
    }
}
