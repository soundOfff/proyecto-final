<?php

namespace Database\Seeders;

use App\Models\ItemGroup;
use Illuminate\Database\Seeder;

class ItemGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $itemGroups = [
            ['id' => 14, 'name' => 'SA & Fundaciones'],
            ['id' => 15, 'name' => 'Corporativo'],
            ['id' => 16, 'name' => 'Administrativo'],
            ['id' => 17, 'name' => 'Veló Recovery'],
            ['id' => 18, 'name' => 'Judicial'],
            ['id' => 19, 'name' => 'Propiedad Intelectual'],
            ['id' => 20, 'name' => 'Migración'],
            ['id' => 21, 'name' => 'Laboral'],
            ['id' => 22, 'name' => 'Familia'],
            ['id' => 23, 'name' => 'Penal'],
            ['id' => 24, 'name' => 'Tecnología e Innovación'],
        ];

        foreach ($itemGroups as $itemGroup) {
            ItemGroup::updateOrCreate(['id' => $itemGroup['id']], $itemGroup);
        }
    }
}
