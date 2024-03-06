<?php

namespace Database\Seeders;

use App\Models\ProcedureStatus;
use Illuminate\Database\Seeder;

class ProcedureStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            ['id' => 1, 'name' => 'Preparar'],
            ['id' => 2, 'name' => 'Enviar'],
            ['id' => 3, 'name' => 'Recibir'],
            ['id' => 4, 'name' => 'Revisar'],
        ];

        foreach ($statuses as $statuses) {
            ProcedureStatus::updateOrCreate(['id' => $statuses['id']], $statuses);
        }
    }
}
