<?php

namespace App\Http\Controllers;

use App\Http\Requests\MailTemplateRequest;
use App\Http\Resources\MailTemplateResource;
use App\Http\Resources\MailTemplateResourceCollection;
use App\Models\MailTemplate;
use App\Models\Partner;
use App\Models\Staff;
use App\Models\Task;
use App\Services\MailTemplateService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use ReflectionClass;
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

        // Generate the full class name
        $class = "App\\Models\\" . $request->model;

        // Check if the class exists to avoid runtime errors
        if (!class_exists($class)) {
            return response()->json(['error' => 'Model not found'], 404);
        }

        $reflector = new \ReflectionClass($class);

        $relations = collect($reflector->getMethods()) // TODO: change it for a abstract class or static method
            ->filter(
                function ($method) use ($class) {
                    $returnType = $method->getReturnType();
                    return
                        !empty($returnType) &&
                        str_contains($returnType, 'Illuminate\Database\Eloquent\Relations\BelongsTo') && // filter by Belongs To only
                        !str_contains($returnType, 'Illuminate\Database\Eloquent\Relations\BelongsToMany');
                }
            )
            ->map(
                function ($method) use ($class) {
                    return ['class' => (with(new ($class))->{$method->name}()->getRelated())::class, 'method' => $method->name];
                }
            )
            ->unique()->values()->all();

        $relations[] = ['class' => $class, 'method' => ''];


        $data = [];
        // Generate relation class fields
        foreach ($relations as $relation) {
            $columns = DB::select("SHOW COLUMNS FROM " . resolve($relation['class'])->getTable());
            $relationFields = [];
            foreach ($columns as $column) {
                $relationFields[] = $column->Field;
            }
            $dataAux = [];
            foreach ($relationFields as $field) {
                $dataAux[] = strtolower(class_basename($class)) .
                    ($relation['method'] != '' ? '-' . $relation['method'] : '') .
                    '-' . $field;
            }
            $key = strtolower(class_basename($class)) . ($relation['method'] != '' ? '-' . $relation['method'] : '');
            $data[] = [$key => $dataAux];
        }


        return response()->json($data);
    }
}
