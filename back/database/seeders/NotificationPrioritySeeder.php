<?php

namespace Database\Seeders;

use App\Models\NotificationPriority;
use Illuminate\Database\Seeder;

class NotificationPrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $priorities = [
            ['id' => 1, 'name' => 'low', 'label' => 'Bajo'],
            ['id' => 2, 'name' => 'mid', 'label' => 'Medio'],
            ['id' => 3, 'name' => 'high', 'label' => 'Alto'],
            ['id' => 4, 'name' => 'urgent', 'label' => 'Urgente'],
        ];

        foreach ($priorities as $priority) {
            NotificationPriority::updateOrCreate(['id' => $priority['id']], $priority);
        }
    }
}
