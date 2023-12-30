<?php

namespace App\Http\Controllers;

use App\Http\Resources\CurrencyResourceCollection;
use App\Models\Currency;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $currencies = QueryBuilder::for(Currency::class)->get();

        return new CurrencyResourceCollection($currencies);
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
    public function show(Currency $currency)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Currency $currency)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Currency $currency)
    {
        //
    }
}
