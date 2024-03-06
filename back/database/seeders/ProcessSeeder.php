<?php

namespace Database\Seeders;

use App\Models\Process;
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
        $processes = [
            ['id' => 1, 'project_id' => 2, 'step_quantity' => 0, 'name' => 'Hipotecario de bien inmueble', 'description' => 'Hipotecario de bien inmueble', 'department' => 'Judicial'],
        ];

        foreach ($processes as $process) {
            Process::updateOrCreate(['id' => $process['id']], $process);
        }
    }
}
