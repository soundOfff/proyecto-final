<?php

namespace Database\Seeders;

use Database\Factories\LineItemFactory;
use Database\Factories\LineItemTaxFactory;
use Database\Factories\ProposalFactory;
use Illuminate\Database\Seeder;

class ProposalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProposalFactory::new()
            ->has(
                LineItemFactory::new()->has(LineItemTaxFactory::new(), 'taxes')->count(3), 'lineItems'
            )
            ->count(10)
            ->create();
    }
}
