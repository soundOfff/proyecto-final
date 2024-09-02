<?php

namespace App\Http\Controllers;

use App\Http\Requests\MailTemplateRequest;
use App\Http\Resources\MailTemplateResource;
use App\Http\Resources\MailTemplateResourceCollection;
use App\Models\MailTemplate;
use App\Models\Task;
use App\Services\MailTemplateService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class MailTemplateController extends Controller
{
    protected $mailService;

    public function __construct(protected MailTemplateService $mailTemplateService)
    {
        $this->mailService = $mailTemplateService;
    }

    public function index()
    {
        $query = QueryBuilder::for(MailTemplate::class)
            ->allowedIncludes(['group', 'lang'])
            ->allowedFilters([
                AllowedFilter::exact('group_id'),
                AllowedFilter::exact('lang_id'),
                AllowedFilter::exact('id'),
                AllowedFilter::exact('event')
            ]);

        $templates = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new MailTemplateResourceCollection($templates);
    }

    public function show(MailTemplate $mailTemplate)
    {
        $template = QueryBuilder::for(MailTemplate::class)
            ->allowedIncludes(['group', 'lang'])
            ->find($mailTemplate->id);

        return new MailTemplateResource($template);
    }

    public function send(Request $request)
    {
        $to = $request->get('to');
        $templateId = $request->get('template_id');
        $taskId = Task::all()->random()->id; // TODO: Remove this, hardcoded only for tets

        $template = MailTemplate::findOrFail($templateId);
        $task = Task::findOrFail($taskId);

        $this->mailTemplateService->sendTemplate($to, $task, $template);

        return response()->json(['message' => 'Mail sent.']);
    }

    public function update(MailTemplate $mailTemplate, MailTemplateRequest $request)
    {
        $newMailTemplate = $request->validated();

        MailTemplate::where('lang_id', $newMailTemplate['lang_id'])
            ->where('event', $newMailTemplate['event'])
            ->update($newMailTemplate);

        return response()->json(null, 204);
    }

    public function allowedFields(Request $request)
    {
        $request->validate([
            'model' => 'required|string',
        ]);

        $data = $this->mailService->generateFields($request->model);

        if (!$data) {
            return response()->json(["error" => "Model $request->model is not possible make fields"], 404);
        }

        return response()->json($data);
    }
}
