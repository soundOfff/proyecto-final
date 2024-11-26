<?php

namespace Database\Seeders;

use App\Models\PartnerProjectRole;
use Illuminate\Database\Seeder;

class PartnerProjectRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            ['id' => 1, 'label' => 'Demandado', 'name' => 'defendant'],
            ['id' => 2, 'label' => 'Demandante', 'name' => 'plaintiff'],
            ['id' => 3, 'label' => 'Fiador', 'name' => 'guarantor'],
            ['id' => 4, 'label' => 'Persona Responsable', 'name' => 'responsible_person'],
        ];

        foreach ($roles as $role) {
            PartnerProjectRole::updateOrCreate(['id' => $role['id']], $role);
        }
    }
}
