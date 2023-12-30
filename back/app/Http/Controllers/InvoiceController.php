<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceSelectResourceCollection;
use App\Models\Invoice;

class InvoiceController extends Controller
{
    public function select()
    {
        $invoices = Invoice::query()
        ->select('number')
        ->distinct()
        ->get();

        return new InvoiceSelectResourceCollection($invoices);
    }
}