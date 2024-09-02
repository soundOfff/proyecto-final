<?php

namespace App\Http\Controllers;

use App\Http\Resources\PartnerTypeResourceCollection;
use App\Models\PartnerType;
use Spatie\QueryBuilder\QueryBuilder;

class PartnerTypeController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(PartnerType::class);

        $types = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new PartnerTypeResourceCollection($types);
    }
}
