<?php

namespace Database\Seeders;

use App\Models\Action;
use Illuminate\Database\Seeder;

class ActionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $actions = [
            ['id' => 1, 'name' => 'expense'],
            ['id' => 2, 'name' => 'api'],
            ['id' => 3, 'name' => 'email'],
        ];

        foreach ($actions as $action) {
            Action::updateOrCreate(['id' => $action['id']], $action);
        }
    }
}
