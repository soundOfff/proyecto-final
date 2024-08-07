<?php

namespace App\Http\Controllers;

use App\Http\Resources\PartnerIndustryResourceCollection;
use App\Models\PartnerIndustry;
use Spatie\QueryBuilder\QueryBuilder;

class PartnerIndustryController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(PartnerIndustry::class);

        $actions = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new PartnerIndustryResourceCollection($actions);
    }
}
