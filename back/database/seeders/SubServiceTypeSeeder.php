<?php

namespace Database\Seeders;

use App\Models\SubServiceType;
use Illuminate\Database\Seeder;

class SubServiceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subServiceTypes = [
            ['id' => 1, 'label' => 'Subtipo 1'],
        ];

        foreach ($subServiceTypes as $subServiceType) {
            SubServiceType::updateOrCreate(['id' => $subServiceType['id']], $subServiceType);
        }
    }
}
