<?php

namespace Database\Seeders;

use Database\Factories\ExpenseFactory;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ExpenseFactory::new()
            ->count(10)
            ->withRandomRelations()
            ->create();
    }
}
