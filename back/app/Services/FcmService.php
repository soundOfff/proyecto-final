<?php

namespace App\Services;

use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

class FcmService
{
    public function sendNotification($deviceToken, $title, $body, $staffId)
    {
        $messaging = app('firebase.messaging');

        $notification = Notification::fromArray([
            'title' => $title,
            'body' => $body,
        ]);

        $message = CloudMessage::fromArray([
            'token' => $deviceToken,
            'notification' => $notification,
            'data' => ['staffId' => $staffId], // optional
        ]);

        $messaging->send($message);
    }
}
