<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\StaffDevice;
use Kreait\Firebase\Exception\Messaging as MessagingErrors;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification as MessagingNotification;

class FcmService
{
    public function sendNotification($deviceToken, $title, $body, $staffId, $modelName, $modelId)
    {
        try {
            $messaging = app('firebase.messaging');

            $notification = MessagingNotification::fromArray([
                'title' => $title,
                'body' => $body,
            ]);

            $staffDeviceId = StaffDevice::where('device_token', $deviceToken)
            ->where('staff_id', $staffId)
            ->first()
            ->id;

            $message = CloudMessage::fromArray([
                'token' => $deviceToken,
                'notification' => $notification,
                'data' => ['staffId' => $staffId],
            ]);

            $messaging->send($message);

            if (isset($staffDeviceId)) {
                $notification = Notification::create([
                    'title' => $title,
                    'body' => $body,
                    'staff_devices_id' => $staffDeviceId,
                    'notifiable_id' => $modelId,
                    'notifiable_type' => $modelName,
                ]);
            }
        } catch (MessagingErrors\NotFound $e) {
            StaffDevice::where('device_token', $deviceToken)->delete();
        }
    }
}
