<?php

namespace Database\Seeders;

use App\Models\EstimateStatus;
use Illuminate\Database\Seeder;

class EstimateStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            ['id' => 1, 'label' => 'No Enviado'],
            ['id' => 2, 'label' => 'Enviado'],
            ['id' => 3, 'label' => 'Rechazado'],
            ['id' => 4, 'label' => 'Aceptado'],
            ['id' => 5, 'label' => 'Expirado'],
        ];

        foreach ($statuses as $status) {
            EstimateStatus::updateOrCreate(['id' => $status['id']], $status);
        }
    }
}
