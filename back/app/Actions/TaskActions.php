<?php

namespace App\Actions;

use App\Models\Action;
use App\Models\ActionType;
use App\Models\Currency;
use App\Models\Expense;
use App\Models\Task;
use Illuminate\Support\Facades\Log;

class TaskActions
{
    public static function handleAction(Task $task, Action $action)
    {
        switch ($action->name) {
            case ActionType::ACTION_EXPENSE:
                self::handleExpense($task, $action);
                break;
            case ActionType::ACTION_API:
                self::handleApi($task, $action);
                break;
            case ActionType::ACTION_MAIL:
                self::handleMail($task, $action);
                break;
            default:
                throw new \Exception("Unknown action type: {$action->name}");
        }
    }

    // TODO: add logic and update to task_actions table is_completed to true
    public static function handleExpense(Task $task, Action $action)
    {
        try {
            $defaultCurrency = Currency::where('is_default', 1)->first();
            Expense::create(
                [
                    'expense_category_id' => 1,
                    'currency_id' => $defaultCurrency->id,
                    'date' => now(),
                    'amount' => 100,
                    'name' => "Expense created from task #{$task->id}",
                    'billable' => $task->billable,
                    'partner_id' => $task->partner_id,
                    'is_infinite' => $task->is_infinite,
                    'project_id' => $task->taskable_type === Task::TASKABLE_PROJECT ? $task->taskable_id : null,
                    'invoice_id' => $task->taskable_type === Task::TASKABLE_INVOICE ? $task->taskable_id : null,
                    'created_from_action' => 1
                ]
            );
        } catch(\Exception $e) {
            dd($e->getMessage());
        }
    }

    public static function handleApi(Task $task)
    {
        // Logic for handling API call
        // dd("test - api from task: {$task->id}");
    }

    public static function handleMail(Task $task)
    {
        // Logic for sending mail
        // dd("test - mail from task: {$task->id}");
    }
}
