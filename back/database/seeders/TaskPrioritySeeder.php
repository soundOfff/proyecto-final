<?php

namespace Database\Seeders;

use App\Models\TaskPriority;
use Illuminate\Database\Seeder;

class TaskPrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $priorities = [
            ['id' => 1, 'name' => 'Bajo'],
            ['id' => 2, 'name' => 'Medio'],
            ['id' => 3, 'name' => 'Alto'],
            ['id' => 4, 'name' => 'Urgente'],
        ];

        foreach ($priorities as $priority) {
            TaskPriority::updateOrCreate(['id' => $priority['id']], $priority);
        }
    }
}
