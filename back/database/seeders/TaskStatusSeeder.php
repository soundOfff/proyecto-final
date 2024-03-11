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
            ['id' => 1, 'name' => 'New Issues'],
            ['id' => 2, 'name' => 'Icebox'],
            ['id' => 3, 'name' => 'Sprint backlog'],
            ['id' => 4, 'name' => 'In progress'],
            ['id' => 5, 'name' => 'Review'],
            ['id' => 6, 'name' => 'Done'],
        ];

        foreach ($statuses as $status) {
            TaskStatus::updateOrCreate(['id' => $status['id']], $status);
        }
    }
}