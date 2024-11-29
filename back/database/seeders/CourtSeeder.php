<?php

namespace Database\Seeders;

use App\Models\Court;
use App\Models\Currency;
use Illuminate\Database\Seeder;

class CourtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $courts = [
            ['id' => 1, 'name' => 'Juzgado 1', 'number' => '001', 'description' => 'Número de juzgado 001'],
            ['id' => 2, 'name' => 'Juzgado 2', 'number' => '002', 'description' => 'Número de juzgado 002'],
            ['id' => 3, 'name' => 'Juzgado 3', 'number' => '003', 'description' => 'Número de juzgado 003'],
        ];

        foreach ($courts as $court) {
            Court::updateOrCreate(['id' => $court['id']], $court);
        }
    }
}
