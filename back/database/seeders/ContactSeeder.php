<?php

namespace Database\Seeders;

use Database\Factories\ContactFactory;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ContactFactory::new()
            ->count(10)
            ->withRandomRelations()
            ->create();
    }
}
