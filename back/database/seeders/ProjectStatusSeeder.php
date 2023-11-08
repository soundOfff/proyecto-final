<?php

namespace Database\Seeders;

use App\Models\ProjectStatus;
use Illuminate\Database\Seeder;

class ProjectStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            ['id' => 1, 'name' => 'not_started', 'label' => 'No Iniciado'],
            ['id' => 2, 'name' => 'developing', 'label' => 'En Desarrollo'],
            ['id' => 3, 'name' => 'waiting', 'label' => 'En Espera'],
            ['id' => 4, 'name' => 'canceled', 'label' => 'Cancelado'],
            ['id' => 5, 'name' => 'finished', 'label' => 'Finalizado'],
        ];

        foreach ($statuses as $status) {
            ProjectStatus::updateOrCreate(['id' => $status['id']], $status);
        }
    }
}
