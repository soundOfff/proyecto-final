<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaxResourceCollection;
use App\Models\Tax;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class TaxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $taxes = QueryBuilder::for(Tax::class)->get();

        return new TaxResourceCollection($taxes);
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
    public function show(Tax $tax)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tax $tax)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tax $tax)
    {
        //
    }
}
