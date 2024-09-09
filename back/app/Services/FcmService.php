<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\NotificationPriority;
use App\Models\StaffDevice;
use Kreait\Firebase\Exception\Messaging as MessagingErrors;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification as MessagingNotification;

class FcmService
{
    public function sendNotification($deviceToken, $title, $body, $staffId, $modelName, $modelId, $createdBy = null, $priorityId = NotificationPriority::DEFAULT): void
    {
        try {
            $messaging = app('firebase.messaging');

            $notification = MessagingNotification::fromArray([
                'title' => $title,
                'body' => $body,
            ]);

            $message = CloudMessage::fromArray([
                'token' => $deviceToken,
                'notification' => $notification,
                'data' => ['staffId' => $staffId],
            ]);

            $messaging->send($message);

            $isNotificationAlreadyCreated = Notification::where('staff_id', $staffId)
                ->where('notifiable_id', $modelId)
                ->where('notifiable_type', $modelName)
                ->where('title', $title)
                ->where('body', $body)
                ->whereBetween('created_at', [now()->subMinutes(1), now()->addMinutes(1)])
                ->exists();

            if ($isNotificationAlreadyCreated) return;

            $notification = Notification::create([
                'title' => $title,
                'body' => $body,
                'staff_id' => $staffId,
                'notifiable_id' => $modelId,
                'notifiable_type' => $modelName,
                'created_by' => $createdBy,
                'notification_priority_id' => $priorityId,
            ]);
        } catch (MessagingErrors\NotFound $e) {
            StaffDevice::where('device_token', $deviceToken)->delete();
        }
    }
}
