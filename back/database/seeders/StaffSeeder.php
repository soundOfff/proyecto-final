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
            ['id' => 1, 'role_id' => 1, 'first_name' => 'John', 'last_name' => 'Doe', 'email' => 'julian@polluxcoop.com'],
            ['id' => 2, 'role_id' => 2, 'first_name' => 'Jane', 'last_name' => 'Doe', 'email' => 'jg@brandfactors.com'],
            ['id' => 3, 'role_id' => 3, 'first_name' => 'John', 'last_name' => 'Smith', 'email' => 'tomas@polluxcoop.com'],
            ['id' => 4, 'role_id' => 4, 'first_name' => 'Jane', 'last_name' => 'Smith', 'email' => 'sergio@polluxcoop.com'],
        ];

        foreach ($staffs as $staff) {
            Staff::updateOrCreate(['id' => $staff['id']], $staff);
        }

        StaffFactory::new()
            ->count(10)
            ->create();
    }
}
