<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\StaffDevice;
use Illuminate\Support\Facades\Log;
use Kreait\Firebase\Exception\Messaging as MessagingErrors;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification as MessagingNotification;

class FcmService
{
    public function sendNotification($deviceToken, $title, $body, $staffId, $modelName, $modelId, $createdBy = null)
    {
        try {
            $messaging = app('firebase.messaging');

            $notification = MessagingNotification::fromArray([
                'title' => $title,
                'body' => $body,
            ]);

            // $staffDevice = StaffDevice::where('staff_id', $staffId)->first(); // change logic

            $message = CloudMessage::fromArray([
                'token' => $deviceToken,
                'notification' => $notification,
                'data' => ['staffId' => $staffId],
            ]);

            $messaging->send($message);

            $notification = Notification::create([
                'title' => $title,
                'body' => $body,
                // 'staff_devices_id' => $staffDevice->id,
                'staff_id' => $staffId,
                'notifiable_id' => $modelId,
                'notifiable_type' => $modelName,
                'created_by' => $createdBy,
            ]);
            Log::info("test: " . $notification->id);
        } catch (MessagingErrors\NotFound $e) {
            StaffDevice::where('device_token', $deviceToken)->delete();
        }
    }
}
