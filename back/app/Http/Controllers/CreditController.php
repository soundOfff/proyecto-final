<?php

namespace App\Http\Controllers;

use App\Models\CreditNote;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CreditController extends Controller
{
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
        }

        return response()->json(null, 201);
    }
}
