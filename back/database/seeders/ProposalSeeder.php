<?php

namespace Database\Seeders;

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
            ->count(10)
            ->withRandomRelations()
            ->create();
    }
}
