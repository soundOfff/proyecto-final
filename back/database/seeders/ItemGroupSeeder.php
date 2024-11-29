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
            ['id' => 1, 'name' => 'Civil'],
            ['id' =>  2, 'name' => 'Corporativo'],
            ['id' =>  3, 'name' => 'Administrativo'],
            ['id' =>  4, 'name' => 'Judicial'],
            ['id' =>  5, 'name' => 'Propiedad Intelectual'],
            ['id' =>  6, 'name' => 'Migración'],
            ['id' =>  7, 'name' => 'Laboral'],
            ['id' =>  8, 'name' => 'Familia'],
            ['id' =>  9, 'name' => 'Penal'],
            ['id' =>  10, 'name' => 'Tecnología e Innovación'],
        ];

        foreach ($itemGroups as $itemGroup) {
            ItemGroup::updateOrCreate(['id' => $itemGroup['id']], $itemGroup);
        }
    }
}
