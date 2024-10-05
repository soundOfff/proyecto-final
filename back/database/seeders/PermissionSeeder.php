<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Recurring;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            ['id' => 1, 'label' => 'Facturas', 'name' => 'invoices'],
            ['id' => 2, 'label' => 'Estimaciones', 'name' => 'estimates'],
            ['id' => 3, 'label' => 'Contratos', 'name' => 'contracts'],
            ['id' => 4, 'label' => 'Propuestas', 'name' => 'proposals'],
            ['id' => 5, 'label' => 'Soporte', 'name' => 'support'],
            ['id' => 6, 'label' => 'Casos', 'name' => 'projects'],
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(['id' => $permission['id']], $permission);
        }
    }
}
