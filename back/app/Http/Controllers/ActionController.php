<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActionResourceCollection;
use App\Models\Action;
use Spatie\QueryBuilder\QueryBuilder;

class ActionController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(Action::class);

        $actions = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new ActionResourceCollection($actions);
    }
}
