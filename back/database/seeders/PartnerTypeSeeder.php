<?php

namespace Database\Seeders;

use App\Models\PartnerType;
use Illuminate\Database\Seeder;

class PartnerTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            ['id' => 1, 'name' => 'responsible', 'label' => 'Responsable Legal'],
            ['id' => 2, 'name' => 'president', 'label' => 'Presidente'],
            ['id' => 3, 'name' => 'secretary', 'label' => 'Secretario'],
            ['id' => 4, 'name' => 'director', 'label' => 'Director'],
        ];

        foreach ($types as $type) {
            PartnerType::updateOrCreate(['id' => $type['id']], $type);
        }
    }
}
