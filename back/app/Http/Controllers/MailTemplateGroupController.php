<?php

namespace App\Http\Controllers;

use App\Http\Resources\MailTemplateGroupResourceCollection;
use App\Models\MailTemplateGroup;
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

    public function updateManyMailTemplates(MailTemplateGroup $group)
    {
        $data = request()->validate([
            'disabled' => 'required|boolean',
        ]);

        $group->mailTemplates()->update($data);

        return response()->json(null, 204);
    }
}
