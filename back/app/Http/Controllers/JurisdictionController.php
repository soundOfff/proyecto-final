<?php

namespace App\Http\Controllers;

use App\Http\Resources\JurisdictionResourceCollection;
use App\Models\District;
use App\Models\Jurisdiction;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class JurisdictionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jurisdictions = QueryBuilder::for(Jurisdiction::class)
        ->allowedFilters(['district_id'])
        ->get();

        return new JurisdictionResourceCollection($jurisdictions);
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
    public function show(Proposal $proposal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proposal $proposal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proposal $proposal)
    {
        //
    }
}
