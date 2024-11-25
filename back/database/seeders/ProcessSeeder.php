<?php

namespace Database\Seeders;

use App\Models\Process;
use Database\Factories\ProcessFactory;
use Illuminate\Database\Seeder;

class ProcessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProcessFactory::new()
            ->count(10)
            ->create();
    }
}
