<?php

namespace Database\Seeders;

use App\Models\TaskRepeat;
use Illuminate\Database\Seeder;

class TaskRepeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $repeats = [
            ['id' => 1, 'label' => '1 Semana', 'days' => '7'],
            ['id' => 2, 'label' => '2 Semanas', 'days' => '15'],
            ['id' => 3, 'label' => '1 Mes', 'days' => '30'],
            ['id' => 4, 'label' => '2 Meses', 'days' => '60'],
            ['id' => 5, 'label' => '3 Meses', 'days' => '90'],
            ['id' => 6, 'label' => '6 Meses', 'days' => '180'],
            ['id' => 7, 'label' => '1 Año', 'days' => '365'],
            ['id' => 8, 'label' => 'Personalizado', 'days' => null],
        ];

        foreach ($repeats as $repeat) {
            TaskRepeat::updateOrCreate(['id' => $repeat['id']], $repeat);
        }
    }
}
