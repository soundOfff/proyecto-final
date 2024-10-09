<?php

namespace Database\Seeders;

use App\Models\ActionType;
use Illuminate\Database\Seeder;

class ActionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $actions = [
            ['id' => 1, 'name' => 'expense', 'label' => 'Crear gasto'],
            ['id' => 2, 'name' => 'api', 'label' => 'Generar poder'],
            ['id' => 3, 'name' => 'email', 'label' => 'Enviar mail'],
            ['id' => 4, 'name' => 'input', 'label' => 'Llenar campo'],
        ];

        foreach ($actions as $action) {
            ActionType::updateOrCreate(['id' => $action['id']], $action);
        }
    }
}
