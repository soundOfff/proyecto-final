<?php

namespace App\Http\Controllers;

use App\Http\Resources\EstimateResourceCollection;
use App\Models\Estimate;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class EstimateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Estimate::class)
        ->allowedIncludes([
            'partner',
            'project.serviceType',
            'currency',
            'invoice',
            'billingCountry',
            'shippingCountry',
        ])
        ->orderBy('id', 'desc');

        $estimates = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new EstimateResourceCollection($estimates);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(Estimate $estimate)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Estimate $estimate)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estimate $estimate)
    {
        //
    }
}
