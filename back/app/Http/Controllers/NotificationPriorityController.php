<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationPriorityResourceCollection;
use App\Models\NotificationPriority;

class NotificationPriorityController extends Controller
{
    public function select()
    {
        $priorities = NotificationPriority::all();
        return new NotificationPriorityResourceCollection($priorities);
    }
}
