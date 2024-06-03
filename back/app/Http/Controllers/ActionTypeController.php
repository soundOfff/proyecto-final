<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActionTypeResourceCollection;
use App\Models\ActionType;
use Spatie\QueryBuilder\QueryBuilder;

class ActionTypeController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(ActionType::class);

        $types = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new ActionTypeResourceCollection($types);
    }
}
