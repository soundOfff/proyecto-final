<?php

namespace Database\Seeders;

use Database\Factories\InvoiceFactory;
use Database\Factories\LineItemFactory;
use Database\Factories\LineItemTaxFactory;
use Illuminate\Database\Seeder;

class InvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        InvoiceFactory::new()
            ->has(
                LineItemFactory::new()->has(LineItemTaxFactory::new(), 'taxes')->count(3), 'lineItems'
            )
            ->count(10)
            ->create();
    }
}
