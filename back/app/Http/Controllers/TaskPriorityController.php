<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskPriorityResourceCollection;
use App\Models\TaskPriority;

class TaskPriorityController extends Controller
{
    public function select()
    {
        $priorities = TaskPriority::all();
        return new TaskPriorityResourceCollection($priorities);
    }
}
