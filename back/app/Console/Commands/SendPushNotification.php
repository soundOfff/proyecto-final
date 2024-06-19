<?php

namespace App\Console\Commands;

use App\Models\Reminder;
use App\Models\TaskStatus;
use App\Services\FcmService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

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
                'staff.id as staff_id',
                'tasks.name as task_name',
                'reminders.description as description',
                'staff_devices.device_token as device_token',
                'reminders.date as reminder_date'
            )
            ->join('staff', 'reminders.staff_id', '=', 'staff.id')
            ->join('staff_devices', 'staff.id', '=', 'staff_devices.staff_id')
            ->join('tasks', function ($join) {
                $join
                    ->on('reminders.reminderable_id', '=', 'tasks.id')
                    ->on('reminders.reminderable_type', '=', DB::raw('"task"'));
            })
            // ->where('reminders.is_notified', false) commented for notification test, uncomment for production
            ->where('tasks.task_status_id', '!=', TaskStatus::COMPLETED)
            ->get();

        foreach ($notifies as $notify) {
            $diffInMinutes = Carbon::now()->diffInMinutes(Carbon::parse($notify->reminder_date));
            if ($diffInMinutes == 0) {
                $this->fcmService->sendNotification($notify->device_token, $notify->task_name, $notify->description, $notify->staff_id);
                Reminder::find($notify->reminder_id)->update(['is_notified' => true]);
            }
        }
    }
}