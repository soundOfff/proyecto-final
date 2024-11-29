<?php

namespace Database\Seeders;

use App\Models\Staff;
use Database\Factories\StaffFactory;
use Illuminate\Database\Seeder;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $staffs = [
            ['id' => 1, 'role_id' => 1, 'first_name' => 'Julián', 'last_name' => 'Villoria', 'email' => 'julian@polluxcoop.com'],
            ['id' => 2, 'role_id' => 2, 'first_name' => 'José', 'last_name' => 'García', 'email' => 'jg@brandfactors.com'],
            ['id' => 3, 'role_id' => 3, 'first_name' => 'Tomás', 'last_name' => 'Brasca', 'email' => 'tomas@polluxcoop.com'],
            ['id' => 4, 'role_id' => 4, 'first_name' => 'Sergio', 'last_name' => 'Milardovich', 'email' => 'sergio@polluxcoop.com'],
        ];

        foreach ($staffs as $staff) {
            Staff::updateOrCreate(['id' => $staff['id']], $staff);
        }

        StaffFactory::new()
            ->count(10)
            ->create();
    }
}
