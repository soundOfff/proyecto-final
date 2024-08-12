<?php

namespace App\Http\Controllers;

use App\Http\Resources\PartnerSectionResourceCollection;
use App\Models\PartnerSection;
use Spatie\QueryBuilder\QueryBuilder;

class PartnerSectionController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(PartnerSection::class);

        $actions = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new PartnerSectionResourceCollection($actions);
    }
}
