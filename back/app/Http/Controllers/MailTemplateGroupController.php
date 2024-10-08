<?php

namespace App\Http\Controllers;

use App\Http\Resources\MailTemplateGroupResourceCollection;
use App\Models\MailTemplateGroup;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class MailTemplateGroupController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(MailTemplateGroup::class)
            ->allowedIncludes(['mailTemplates.lang']);

        $groups = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new MailTemplateGroupResourceCollection($groups);
    }
}
