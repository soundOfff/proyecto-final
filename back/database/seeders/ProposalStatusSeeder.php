<?php

namespace Database\Seeders;

use App\Models\ProposalStatus;
use Illuminate\Database\Seeder;

class ProposalStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subServiceTypes = [
            ['id' => 1, 'label' => 'Borrador'],
            ['id' => 2, 'label' => 'Enviada'],
            ['id' => 3, 'label' => 'Abierta'],
            ['id' => 4, 'label' => 'En Estudio'],
            ['id' => 5, 'label' => 'Rechazada'],
            ['id' => 6, 'label' => 'Aceptada'],
        ];

        foreach ($subServiceTypes as $subServiceType) {
            ProposalStatus::updateOrCreate(['id' => $subServiceType['id']], $subServiceType);
        }
    }
}
