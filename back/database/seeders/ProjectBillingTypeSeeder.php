<?php

namespace Database\Seeders;

use App\Models\ProjectBillingType;
use Illuminate\Database\Seeder;

class ProjectBillingTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $billingTypes = [
            ['id' => 1, 'name' => 'fixed_price', 'label' => 'Precio Fijo'],
            ['id' => 2, 'name' => 'project_hours', 'label' => 'Horas del Proyecto'],
            ['id' => 3, 'name' => 'task_hours', 'label' => 'Horas de las Tareas'],
        ];

        foreach ($billingTypes as $billingType) {
            ProjectBillingType::updateOrCreate(['id' => $billingType['id']], $billingType);
        }
    }
}
