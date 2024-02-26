<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskPrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $priorities = [
            ['name' => 'Bajo'],
            ['name' => 'Medio'],
            ['name' => 'Alto'],
            ['name' => 'Urgente'],
        ];

        foreach ($priorities as $priority) {
            \App\Models\TaskPriority::create($priority);
        }
    }
}
