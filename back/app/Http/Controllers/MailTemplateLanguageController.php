<?php

namespace App\Http\Controllers;

use App\Http\Resources\MailTemplateLanguageResourceCollection;
use App\Models\MailTemplateLanguage;
use Spatie\QueryBuilder\QueryBuilder;

class MailTemplateLanguageController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(MailTemplateLanguage::class);

        $groups = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new MailTemplateLanguageResourceCollection($groups);
    }
}
