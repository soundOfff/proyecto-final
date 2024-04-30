<?php

namespace App\Http\Controllers;

use App\Http\Resources\CreditResourceCollection;
use App\Models\Credit;
use App\Models\CreditNote;
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
        }

        return response()->json(null, 201);
    }

    public function destroy(Credit $credit)
    {
        $credit->delete();

        return response()->json(null, 204);
    }
}
