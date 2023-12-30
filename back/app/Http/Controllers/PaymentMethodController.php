<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaymentMethodResourceCollection;
use App\Models\Currency;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paymentMethods = QueryBuilder::for(PaymentMethod::class)->get();

        return new PaymentMethodResourceCollection($paymentMethods);
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
