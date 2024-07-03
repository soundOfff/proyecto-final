<?php

namespace App\Http\Controllers;

use App\Http\Resources\MailTemplateResourceCollection;
use App\Models\MailTemplate;
use Spatie\QueryBuilder\AllowedInclude;
use Spatie\QueryBuilder\QueryBuilder;

class MailTemplateController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(MailTemplate::class)
            ->allowedIncludes(['group']);

        $templates = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new MailTemplateResourceCollection($templates);
    }
}
