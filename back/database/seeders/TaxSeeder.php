<?php

namespace Database\Seeders;

use App\Models\Tax;
use Illuminate\Database\Seeder;

class TaxSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $taxes = [
            ['id' => 1, 'name' => 'I.T.B.M.S', 'tax_rate' => 7],
            ['id' => 2, 'name' => 'Agente Retenedor', 'tax_rate' => -3.5],
        ];

        foreach ($taxes as $tax) {
            Tax::updateOrCreate(['id' => $tax['id']], $tax);
        }
    }
}
