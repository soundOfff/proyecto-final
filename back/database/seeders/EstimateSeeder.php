<?php

namespace Database\Seeders;

use App\Models\Estimate;
use Database\Factories\EstimateFactory;
use Database\Factories\LineItemFactory;
use Database\Factories\LineItemTaxFactory;
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
        EstimateFactory::new()
            ->has(
                LineItemFactory::new()->has(LineItemTaxFactory::new(), 'taxes')->count(3), 'lineItems'
            )
            ->count(10)
            ->create();
    }
}
