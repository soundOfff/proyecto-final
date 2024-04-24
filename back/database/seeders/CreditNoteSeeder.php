<?php

namespace Database\Seeders;

use App\Models\CreditNote;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class CreditNoteSeeder extends Seeder
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
        $creditNotes = $this->utils->csvToArray(database_path('imports/credit_notes.csv'));

        foreach ($creditNotes as $creditNote) {
            CreditNote::updateOrCreate(['id' => $creditNote['id']], $creditNote);
        }
    }
}
