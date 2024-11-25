<?php

namespace Database\Seeders;

use App\Models\Country;
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
            ->for(Country::panama())
            ->count(50)
            ->create();
    }
}
