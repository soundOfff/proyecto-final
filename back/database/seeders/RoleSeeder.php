<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            ['id' => 1, 'name' => 'partner', 'label' => 'Socio'],
            ['id' => 2, 'name' => 'lawyer', 'label' => 'Abogado'],
            ['id' => 3, 'name' => 'intern', 'label' => 'Pasante'],
            ['id' => 4, 'name' => 'countability', 'label' => 'Contabilidad'],
            ['id' => 5, 'name' => 'assistance', 'label' => 'Asistente'],
            ['id' => 6, 'name' => 'guest', 'label' => 'Invitado'],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(['id' => $role['id']], $role);
        }
    }
}
