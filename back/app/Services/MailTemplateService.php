<?php

namespace App\Services;

use App\Mail\TemplateMailable;
use App\Models\MailTemplate;
use App\Models\Task;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class MailTemplateService
{
    public function __construct()
    {
    }

    public function generateFields(string $model)
    {

        $class = "App\\Models\\" . $model;
        // Check if the class exists to avoid runtime errors
        if (!class_exists($class)) {
            return null;
        }

        $reflector = new \ReflectionClass($class);

        $relations = collect($reflector->getMethods()) // TODO: change it for a abstract class or static method
            ->filter(
                function ($method) {
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
            $relClass = resolve($relation['class']);
            $columns = DB::select("SHOW COLUMNS FROM " . $relClass->getTable());
            $relationFields = [];
            $classFields = isset($relClass::$MAIL_TEMPLATE_ALLOWED_FIELDS) ? $relClass::$MAIL_TEMPLATE_ALLOWED_FIELDS : null;

            if ($classFields) {
                $relationFields = $classFields;
            } else {
                foreach ($columns as $column) {
                    $relationFields[] = $column->Field;
                }
                // Filtering data for security
                $relationFields = array_filter($relationFields, function ($field) {
                    return !str_contains($field, "_id") && !str_contains($field, "id_") &&
                        !str_contains($field, "_type") && !str_contains($field, "key") &&
                        !str_contains($field, "token") && !str_contains($field, "code") &&
                        !str_contains($field, "_at");
                });
            }

            $dataAux = [];
            foreach ($relationFields as $field) {
                $dataAux[] = strtolower(class_basename($class)) .
                    ($relation['method'] != '' ? '-' . $relation['method'] : '') .
                    '-' . $field;
            }
            $key = $relation['method'] != '' ? strtoupper($relation['method']) : strtoupper(class_basename($class));
            $data[] = [$key => $dataAux];
        }


        return $data;
    }

    public function sendTemplate(string $to, Model $model, MailTemplate $template)
    {
        $body = $this->mapFields($model, $template->body);
        $subject = $this->mapFields($model, $template->subject);

        abort_if(!get_class($model), 500, 'Model does not have MAIL_TEMPLATE_FIELDS');

        $mailable = new TemplateMailable($body);
        $mailable->subject($subject);

        Mail::to($to)->send($mailable);
    }

    private function mapFields(Model $model, string $text): string
    {
        return  preg_replace_callback('/\{([^}]*)\}/', function ($match) use ($model) {
            $models = explode("-", $match[1]);
            $modelReplace = $model[$models[1]];

            for ($i = 2; $i < count($models); $i++) {
                if (!isset($modelReplace[$models[$i]])) {
                    $modelReplace = "not found";
                    break;
                }
                $modelReplace = $modelReplace[$models[$i]];
            }

            return $modelReplace;
        }, $text);
    }
}
