<?php

namespace Database\Seeders;

use App\Models\TicketStatus;
use Illuminate\Database\Seeder;

class TicketStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            ['id' => 1, 'name' => 'New Issues', 'is_default' => 0, 'color' => '#FF0000', 'order' => 0],
            ['id' => 2, 'name' => 'Icebox', 'is_default' => 0, 'color' => '#FF0000', 'order' => 1],
            ['id' => 3, 'name' => 'Sprint backlog', 'is_default' => 0, 'color' => '#FF0000', 'order' => 2],
            ['id' => 4, 'name' => 'In progress', 'is_default' => 0, 'color' => '#FF0000', 'order' => 3],
            ['id' => 5, 'name' => 'Review', 'is_default' => 0, 'color' => '#FF0000', 'order' => 4],
            ['id' => 6, 'name' => 'Done', 'is_default' => 0, 'color' => '#FF0000', 'order' => 5],
        ];

        foreach ($statuses as $status) {
            TicketStatus::updateOrCreate(['id' => $status['id']], $status);
        }
    }
}
