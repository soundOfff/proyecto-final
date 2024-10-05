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
            ['id' => 1, 'name' => 'No Iniciada'],
            ['id' => 2, 'name' => 'Iniciada'],
            ['id' => 3, 'name' => 'En Proceso'],
            ['id' => 4, 'name' => 'Completadas'],
            ['id' => 5, 'name' => 'Borradas'],
        ];

        foreach ($statuses as $statuses) {
            ProcedureStatus::updateOrCreate(['id' => $statuses['id']], $statuses);
        }
    }
}
