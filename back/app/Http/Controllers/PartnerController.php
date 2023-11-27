<?php

namespace App\Http\Controllers;

use App\Http\Resources\PartnerResourceCollection;
use App\Http\Resources\PartnerSelectResourceCollection;
use App\Models\Partner;
use App\Models\Project;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class PartnerController extends Controller
{
    public function select()
    {
        $partners = Partner::all();

        return new PartnerSelectResourceCollection($partners);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Partner::class)
        ->allowedIncludes([
            'user.contacts',
        ]);

        $partners = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new PartnerResourceCollection($partners);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
