<?php

namespace Database\Seeders;

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
        StaffFactory::new()
            ->count(10)
            ->create();
    }
}
