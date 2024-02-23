<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskStatusResourceCollection;
use App\Models\TaskStatus;

class TaskStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $status = TaskStatus::all();
        return new TaskStatusResourceCollection($status);
    }
}
