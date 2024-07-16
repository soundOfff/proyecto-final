<?php

namespace App\Http\Controllers;

use App\Http\Requests\MailTemplateRequest;
use App\Http\Resources\MailTemplateResource;
use App\Http\Resources\MailTemplateResourceCollection;
use App\Models\MailTemplate;
use App\Models\Task;
use App\Services\MailTemplateService;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class MailTemplateController extends Controller
{
    public function __construct(protected MailTemplateService $mailTemplateService)
    {
    }

    public function index()
    {
        $query = QueryBuilder::for(MailTemplate::class)
            ->allowedIncludes(['groups']);

        $templates = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new MailTemplateResourceCollection($templates);
    }

    public function show(MailTemplate $mailTemplate)
    {
        $template = QueryBuilder::for(MailTemplate::class)
            ->allowedIncludes(['groups'])
            ->find($mailTemplate->id);

        return new MailTemplateResource($template);
    }

    public function send(Request $request)
    {
        $to = $request->get('to');
        $templateId = $request->get('template_id');
        $taskId = $request->get('task_id');

        $template = MailTemplate::findOrFail($templateId);
        $task = Task::findOrFail($taskId);

        $this->mailTemplateService->sendTemplate($to, $task, $template);

        return response()->json(['message' => 'Mail sent.']);
    }

    public function update(MailTemplate $mailTemplate, MailTemplateRequest $request)
    {
        $newMailTemplate = $request->validated();

        $mailTemplate->update($newMailTemplate);

        return response()->json(null, 204);
    }

    public function allowedFields(Request $request)
    {
        $request->validate([
            'model' => 'required|string',
        ]);

        $fields = $request->model::CUSTOM_TEMPLATE_FIELDS;

        return response()->json($fields);
    }
}
