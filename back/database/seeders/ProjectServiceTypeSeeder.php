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
            ['id' => 7, 'name' => 'societies', 'label' => 'Sociedades'],
            ['id' => 8, 'name' => 'foundations', 'label' => 'Fundaciones'],
            ['id' => 9, 'name' => 'outsourced_jobs', 'label' => 'Oficios Tercerizados'],
            ['id' => 10, 'name' => 'administrative_cases', 'label' => 'Casos Administrativos'],
            ['id' => 11, 'name' => 'simple_executive_process', 'label' => 'Procesos Ejecutivos Simples'],
            ['id' => 12, 'name' => 'mortgage_executive_process', 'label' => 'Procesos Ejecutivos Hipotecarios'],
            ['id' => 13, 'name' => 'extrajudicial_settlements', 'label' => 'Arreglos Extrajudiciales'],
            ['id' => 14, 'name' => 'migration', 'label' => 'Migración'],
            ['id' => 15, 'name' => 'copyright', 'label' => 'Propiedad Intelectual'],
            ['id' => 16, 'name' => 'litigation', 'label' => 'Litigios'],
        ];

        foreach ($serviceTypes as $serviceType) {
            ProjectServiceType::updateOrCreate(['id' => $serviceType['id']], $serviceType);
        }
    }
}
