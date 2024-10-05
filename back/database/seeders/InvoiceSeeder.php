<?php

namespace Database\Seeders;

use App\Models\Invoice;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class InvoiceSeeder extends Seeder
{
    private $utils;

    public function __construct(Utils $utils = null)
    {
        $this->utils = $utils;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $invoices = $this->utils->csvToArray(database_path('imports/invoices.csv'));

        foreach ($invoices as $invoice) {
            Invoice::updateOrCreate(['id' => $invoice['id']], $invoice);
        }
    }
}
