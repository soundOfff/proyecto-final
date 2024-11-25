<?php

namespace Database\Seeders;

use Database\Factories\EstimateFactory;
use Illuminate\Database\Seeder;

class EstimateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        EstimateFactory::new()->count(10)->create();
    }
}
