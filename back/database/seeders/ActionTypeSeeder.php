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
            ['id' => 1, 'name' => 'expense', 'label' => 'Crear un gasto'],
            ['id' => 2, 'name' => 'api', 'label' => 'Mandar un request'],
            ['id' => 3, 'name' => 'email', 'label' => 'Enviar un email'],
            ['id' => 4, 'name' => 'input', 'label' => 'Llenar un campo'],
        ];

        foreach ($actions as $action) {
            ActionType::updateOrCreate(['id' => $action['id']], $action);
        }
    }
}
