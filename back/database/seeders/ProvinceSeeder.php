<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Seeder;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $provinces = [
            ['id' => 1, 'name' => 'BOCAS DEL TORO'],
            ['id' => 2, 'name' => 'COCLE'],
            ['id' => 3, 'name' => 'COLON'],
            ['id' => 4, 'name' => 'CHIRIQUI'],
            ['id' => 5, 'name' => 'DARIEN'],
            ['id' => 6, 'name' => 'HERRERA'],
            ['id' => 7, 'name' => 'LOS SANTOS'],
            ['id' => 8, 'name' => 'PANAMA'],
            ['id' => 9, 'name' => 'VERAGUAS'],
            ['id' => 10, 'name' => 'COMARCA KUNA YALA'],
            ['id' => 11, 'name' => 'COMARCA EMBERA'],
            ['id' => 12, 'name' => 'COMARCA NGABE'],
            ['id' => 13, 'name' => 'PANAMA OESTE'],
        ];

        foreach ($provinces as $province) {
            Province::updateOrCreate(['id' => $province['id']], $province);
        }
    }
}
