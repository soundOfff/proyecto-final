<?php

namespace App\Services;

use App\Mail\TemplateMailable;
use App\Models\MailTemplate;
use App\Models\Task;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class MailTemplateService
{
    public function __construct()
    {
    }

    public function sendTemplate(string $to, Model $model, MailTemplate $template) // $model->priority
    {
        $body = $template->body;

        $class = get_class($model);

        abort_if(!$class::MAIL_TEMPLATE_FIELDS, 500, 'Model does not have MAIL_TEMPLATE_FIELDS constant');

        foreach ($class::MAIL_TEMPLATE_FIELDS as $slug) {
            $models = explode("-", $slug["key"]);

            $modelReplace = $model[$models[1]];

            for ($i = 2; $i < count($models); $i++) {
                if (!isset($modelReplace[$models[$i]])) {
                    $modelReplace = "---";
                    break;
                }
                $modelReplace = $modelReplace[$models[$i]];
            }

            $body = str_replace("{" . $slug["key"] . "}", $modelReplace, $body);
        }


        Mail::to($to)->send(new TemplateMailable($body));
    }
}
