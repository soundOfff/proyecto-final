<?php

namespace App\Actions;

use App\Models\Task;

class TaskActions
{
    public static function handleExpense(Task $task)
    {
        // Logic for handling expense
        dd("test - expense");
    }

    public static function handleApi(Task $task)
    {
        // Logic for handling API call
        dd("test - api");
    }

    public static function handleMail(Task $task)
    {
        // Logic for sending mail
        dd("test - mail");
    }
}
