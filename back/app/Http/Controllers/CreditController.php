<?php

namespace App\Http\Controllers;

use App\Http\Resources\CreditResourceCollection;
use App\Models\Credit;
use App\Models\CreditNote;
use App\Models\CreditNoteStatus;
use App\Models\Invoice;
use App\Models\InvoiceStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class CreditController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(Credit::class)
        ->allowedIncludes('invoice', 'creditNote', 'staff')
        ->allowedFilters('invoice_id', 'credit_note_id');

        $creditNotes = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new CreditResourceCollection($creditNotes);
    }

    public function attach(Request $request)
    {
        $payments = $request->get('payments');
        $creditNote = CreditNote::findOrFail($request->get('credit_note_id'));

        foreach ($payments as $payment) {
            $creditNote->credits()->create([
                'invoice_id' => $payment['invoice_id'],
                'amount' => $payment['amount'],
                'staff_id' => $request->get('staff_id'),
                'date' => Carbon::now(),
            ]);

            $invoice = Invoice::find($payment['invoice_id']);
            if ($invoice->pending_to_pay == 0) {
                $invoice->update(['invoice_status_id' => InvoiceStatus::PAID]);
            }
        }

        if ($creditNote->pending_credits == 0) {
            $creditNote->update(['credit_note_status_id' => CreditNoteStatus::CLOSED]);
        }

        return response()->json(null, 201);
    }

    public function destroy(Credit $credit)
    {
        $credit->delete();

        return response()->json(null, 204);
    }
}
