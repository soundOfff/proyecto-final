<?php

namespace App\Services;

use App\Models\StaffDevice;
use App\Models\Notification;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification as MessagingNotification;

class FcmService
{
    public function sendNotification($deviceToken, $title, $body, $staffId)
    {
        $messaging = app('firebase.messaging');

        $notification = MessagingNotification::fromArray([
            'title' => $title,
            'body' => $body,
        ]);

        $staffDeviceId = StaffDevice::where('device_token', $deviceToken)
            ->where('staff_id', $staffId)
            ->first()
            ->id;

        if (isset($staffDeviceId)) {
            Notification::create(
                [
                    'title' => $title,
                    'body' => $body,
                    'staff_devices_id' => $staffDeviceId
                ]
            );
        }

        $message = CloudMessage::fromArray([
            'token' => $deviceToken,
            'notification' => $notification,
            'data' => ['staffId' => $staffId], // optional
        ]);

        $messaging->send($message);
    }
}
