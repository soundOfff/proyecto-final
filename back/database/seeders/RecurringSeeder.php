<?php

namespace Database\Seeders;

use App\Models\Recurring;
use Illuminate\Database\Seeder;

class RecurringSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $recurrings = [
            ['id' => 1, 'label' => 'No', 'value' => null],
            ['id' => 2, 'label' => 'Cada 1 Mes', 'value' => 1],
            ['id' => 3, 'label' => 'Cada 2 Meses', 'value' => 2],
            ['id' => 4, 'label' => 'Cada 3 Meses', 'value' => 3],
            ['id' => 5, 'label' => 'Cada 4 Meses', 'value' => 4],
            ['id' => 6, 'label' => 'Cada 5 Meses', 'value' => 5],
            ['id' => 7, 'label' => 'Cada 6 Meses', 'value' => 6],
            ['id' => 8, 'label' => 'Cada 7 Meses', 'value' => 7],
            ['id' => 9, 'label' => 'Cada 8 Meses', 'value' => 8],
            ['id' => 10, 'label' => 'Cada 9 Meses', 'value' => 9],
            ['id' => 11, 'label' => 'Cada 10 Meses', 'value' => 10],
            ['id' => 12, 'label' => 'Cada 11 Meses', 'value' => 11],
            ['id' => 13, 'label' => 'Cada 12 Meses', 'value' => 12],
            ['id' => 14, 'label' => 'Personalizado', 'value' => null],
        ];

        foreach ($recurrings as $recurring) {
            Recurring::updateOrCreate(['id' => $recurring['id']], $recurring);
        }
    }
}
