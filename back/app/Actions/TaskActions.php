<?php

namespace App\Actions;

use App\Models\Action;
use App\Models\ActionType;
use App\Models\Currency;
use App\Models\Expense;
use App\Models\Task;
use App\Services\DocassembleService;
use App\Services\FileService;
use App\Services\MailTemplateService;

class TaskActions
{
    public function __construct(
        protected DocassembleService $docassembleService,
        protected MailTemplateService $mailTemplateService
    ) {
    }

    public static function handleAction(Task $task, Action $action)
    {
        switch ($action->action_type_id) {
            case ActionType::ACTION_EXPENSE_ID:
                self::handleExpense($task, $action);
                break;
            case ActionType::ACTION_API_ID:
                self::handleApi($task, $action);
                break;
            case ActionType::ACTION_MAIL_ID:
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
                    'name' => $action->name,
                    'note' => $action->description,
                    'billable' => $task->billable,
                    'partner_id' => $task->partner_id,
                    'is_infinite' => $task->is_infinite,
                    'project_id' => $task->taskable_type === Task::TASKABLE_PROJECT ? $task->taskable_id : null,
                    'invoice_id' => $task->taskable_type === Task::TASKABLE_INVOICE ? $task->taskable_id : null,
                    'created_from_action' => 1,
                ]
            );
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public static function handleApi(Task $task)
    {
        $fileService = new FileService();
        $docassembleService = new DocassembleService($fileService);
        $docassembleService->createDocumentFromAction($task);
    }

    public static function handleMail(Task $task, Action $action)
    {
        try {
            $mailTemplateService = new MailTemplateService();
            $mailTemplateService->sendTemplate($action->mail_to, $task, $action->mailTemplate);
            $action->update([
                'is_dispatched' => true,
            ]);
        } catch (\Throwable $th) {
            throw new \Exception("Error sending mail: {$th->getMessage()}");
        }
    }
}
