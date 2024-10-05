<?php

namespace Database\Seeders;

use App\Models\CreditNoteStatus;
use Illuminate\Database\Seeder;

class CreditNoteStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $creditNoteStatuses = [
            ['id' => 1, 'label' => 'Abierto'],
            ['id' => 2, 'label' => 'Cerrado'],
        ];

        foreach ($creditNoteStatuses as $creditNoteStatus) {
            CreditNoteStatus::updateOrCreate(['id' => $creditNoteStatus['id']], $creditNoteStatus);
        }
    }
}
