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
            ['id' => 1, 'name' => 'Impuesto 1', 'rate' => 21],
            ['id' => 2, 'name' => 'Impuesto 2', 'rate' => 7],
            ['id' => 3, 'name' => 'Impuesto 3', 'rate' => -5],
        ];

        foreach ($taxes as $tax) {
            Tax::updateOrCreate(['id' => $tax['id']], $tax);
        }
    }
}
