<?php

namespace App\Http\Controllers;

use App\Http\Requests\PartnerRequest;
use App\Http\Resources\PartnerResource;
use App\Http\Resources\PartnerResourceCollection;
use App\Http\Resources\PartnerSelectResourceCollection;
use App\Http\Resources\PaymentResourceCollection;
use App\Models\Partner;
use App\Models\Payment;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Payment::class)
        ->allowedIncludes([
            'invoice',
            'paymentMethod',
        ])
        ->allowedFilters([
            AllowedFilter::exact('invoice_id'),

        ])
        ->orderBy('id', 'desc');

        $payments = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new PaymentResourceCollection($payments);
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
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();

        return response()->json(null, 204);
    }
}
