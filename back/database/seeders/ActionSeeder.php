<?php

namespace Database\Seeders;

use App\Models\Action;
use Illuminate\Database\Seeder;

class ActionSeeder extends Seeder
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
            Action::updateOrCreate(['id' => $action['id']], $action);
        }
    }
}
