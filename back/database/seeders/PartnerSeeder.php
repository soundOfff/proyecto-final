<?php

namespace Database\Seeders;

use Database\Factories\PartnerFactory;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PartnerFactory::new()
            ->count(10)
            ->juridic()
            ->create();

        PartnerFactory::new()
            ->count(10)
            ->natural()
            ->create();
    }
}
