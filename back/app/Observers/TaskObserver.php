<?php

namespace App\Observers;

use App\Actions\TaskActions;
use App\Models\Task;
use App\Models\TaskStatus;
use App\Services\NotificationService;

class TaskObserver
{
    /**
     * Handle the Task "created" event.
     */
    public function created(Task $task): void
    {
        // Case 1 - Task is created.
        $this->dispatchActions($task);
    }

    /**
     * Handle the Task "updated" event.
     */
    public function updated(Task $task): void
    {
        if (! $task->wasChanged('task_status_id') || $task->task_status_id !== TaskStatus::COMPLETED) {
            return;
        }
        // Case 1 - Task is closed.
        $this->dispatchActions($task);
        // Case 2 - Task is closed and another task is unlocked.
        $lockedTasks = $task->dependentTasks;
        $recentlyUnlockedTasks = [];
        foreach ($lockedTasks as $lt) {
            if (! $lt->isBlocked) {
                $recentlyUnlockedTasks[] = $lt;
            }
        }

        // send notification to staff assigneds
        $notificationService = new NotificationService();
        foreach ($recentlyUnlockedTasks as $unlockedTask) {
            $this->dispatchActions($unlockedTask);
            foreach ($unlockedTask->assigneds as $assigned) {
                $notificationService->sendSlackNotification(
                    staffId: $assigned->id,
                    header: "La tarea #{$unlockedTask->id} ha sido desbloqueada",
                    body: "Se completo la tarea #{$task->id}. La tarea: \"{$unlockedTask->name}\" ha sido desbloqueada y ahora puede ser completada.",
                    url: "/tasks?taskId={$unlockedTask->id}",
                    modelId: $unlockedTask->id,
                    modelType: Task::class
                );
                foreach ($assigned->devices as $device) {
                    $notificationService->sendWebPushNotification(
                        $device->device_token,
                        "La tarea #{$unlockedTask->id} ha sido desbloqueada",
                        "Se completo la tarea #{$task->id}. La tarea: \"{$unlockedTask->name}\" ha sido desbloqueada y ahora puede ser completada.",
                        $assigned->id,
                        strtolower(class_basename(Task::class)),
                        $unlockedTask->id
                    );
                }
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

    private function dispatchActions(Task $task)
    {
        $task->actions->each(fn ($action) => TaskActions::handleAction($task, $action));
    }
}
