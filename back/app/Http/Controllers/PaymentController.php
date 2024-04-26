<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Http\Resources\PaymentResourceCollection;
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
            'invoices',
            'paymentMethod',
            'partner',
        ])
        ->select("payments.*")
        ->allowedFilters([
            AllowedFilter::exact('invoice_id'),
            AllowedFilter::exact('partner_id'),
            AllowedFilter::scope('search')
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
    public function store(PaymentRequest $request)
    {   
        $newPayment = $request->validated();
        $payment = Payment::create($newPayment);
        return response()->json($payment, 201);
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
