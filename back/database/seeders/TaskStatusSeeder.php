<?php

namespace Database\Seeders;

use App\Models\TaskStatus;
use Illuminate\Database\Seeder;

class TaskStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            ['id' => 1, 'name' => 'Sin iniciar'],
            ['id' => 2, 'name' => 'En Proceso'],
            ['id' => 3, 'name' => 'Culminada'],
        ];

        foreach ($statuses as $status) {
            TaskStatus::updateOrCreate(['id' => $status['id']], $status);
        }
    }
}
