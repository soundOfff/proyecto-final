<?php

namespace Database\Seeders;

use App\Models\LineItemType;
use Illuminate\Database\Seeder;

class LineItemTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $itemTypes = [
            ['id' => 1, 'label' => 'Honorarios'],
            ['id' => 2, 'label' => 'Gastos'],
            ['id' => 3, 'label' => 'Tareas'],
        ];

        foreach ($itemTypes as $itemType) {
            LineItemType::updateOrCreate(['id' => $itemType['id']], $itemType);
        }
    }
}
