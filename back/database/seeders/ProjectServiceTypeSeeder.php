<?php

namespace Database\Seeders;

use App\Models\ProjectServiceType;
use Illuminate\Database\Seeder;

class ProjectServiceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $serviceTypes = [
            ['id' => 1, 'name' => 'sa_foundations', 'label' => 'SA & Fundaciones'],
            ['id' => 2, 'name' => 'administrative', 'label' => 'Administrativo'],
            ['id' => 3, 'name' => 'velo_recovery', 'label' => 'Velo Recovery'],
            ['id' => 4, 'name' => 'judicial', 'label' => 'Judicial'],
            ['id' => 5, 'name' => 'corporate', 'label' => 'Corporativo'],
            ['id' => 6, 'name' => 'labor', 'label' => 'Laboral'],
        ];

        foreach ($serviceTypes as $serviceType) {
            ProjectServiceType::updateOrCreate(['id' => $serviceType['id']], $serviceType);
        }
    }
}
