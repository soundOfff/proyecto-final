<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Http\Resources\PaymentResourceCollection;
use App\Models\Invoice;
use App\Models\InvoiceStatus;
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
            'paymentMethod',
            'partner',
            'invoices',
        ])
        ->select('payments.*')
        ->allowedFilters([
            AllowedFilter::callback('invoices', function ($query, $value) {
                if (! is_array($value)) {
                    $value = [$value];
                }
                $query->whereHas('invoices', function ($query) use ($value) {
                    $query->whereIn('invoices.id', $value);
                });
            }),
            AllowedFilter::exact('partner_id'),
            AllowedFilter::scope('search'),
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

    public function attach(Request $request)
    {
        $partialPays = $request->get('payments');
        $payment = Payment::findOrFail($request->get('payment_id'));

        foreach ($partialPays as $partialPay) {
            $payment->invoices()->attach($partialPay['invoice_id'], [
                'amount' => $partialPay['amount'],
            ]);

            $invoice = Invoice::find($partialPay['invoice_id']);
            if ($invoice->pending_to_pay == 0) {
                $invoice->update(['invoice_status_id' => InvoiceStatus::PAID]);
            }
        }

        return response()->json(null, 201);
    }

    public function detach(Request $request)
    {
        $payment = Payment::findOrFail($request->get('payment_id'));
        $payment->invoices()->detach($request->get('invoice_id'));

        return response()->json(null, 204);
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
