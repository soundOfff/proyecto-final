<?php

namespace Database\Seeders;

use App\Models\PartnerSection;
use Illuminate\Database\Seeder;

class PartnerSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = [
            ['id' => 1, 'name' => 'mercantile', 'label' => 'Mercantil'],
            ['id' => 2, 'name' => 'others', 'label' => 'Otros'],
            ['id' => 3, 'name' => 'unknown', 'label' => 'Desconocido'],
        ];

        foreach ($sections as $section) {
            PartnerSection::updateOrCreate(['id' => $section['id']], $section);
        }
    }
}
