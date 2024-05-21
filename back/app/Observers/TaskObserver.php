<?php

namespace App\Observers;

use App\Events\TaskClosed;
use App\Events\TaskCreated;
use App\Events\TaskUnlocked;
use App\Models\Task;
use App\Models\TaskStatus;
use Illuminate\Support\Facades\Event;

class TaskObserver
{
    /**
     * Handle the Task "created" event.
     */
    public function created(Task $task): void
    {
        // Case 1 - Task is created.
        Event::dispatch(new TaskCreated($task));
    }

    /**
     * Handle the Task "updated" event.
     */
    public function updated(Task $task): void
    {
        if ($task->wasChanged('task_status_id') && $task->task_status_id !== TaskStatus::COMPLETED) return;
        
        // Case 1 - Task is closed.
        Event::dispatch(new TaskClosed($task));

        // Case 2 - Task is closed and another task is unlocked.
        $lockedTasks = $task->dependentTasks;
        $recentlyUnlockedTasks = [];
        foreach ($lockedTasks as $lt) {
            $isBlocked = $lt->dependencies->contains(fn (Task $task) => $task->task_status_id !== TaskStatus::COMPLETED);
            if (!$isBlocked) {
                $recentlyUnlockedTasks[] = $lt;
            }
        }

        if (count($recentlyUnlockedTasks) > 0) {
            foreach ($recentlyUnlockedTasks as $task) {
                Event::dispatch(new TaskUnlocked($task));
            }
        }
        
    }

    /**
     * Handle the Task "deleted" event.
     */
    public function deleted(Task $task): void
    {
        //
    }

    /**
     * Handle the Task "restored" event.
     */
    public function restored(Task $task): void
    {
        //
    }

    /**
     * Handle the Task "force deleted" event.
     */
    public function forceDeleted(Task $task): void
    {
        //
    }
}
