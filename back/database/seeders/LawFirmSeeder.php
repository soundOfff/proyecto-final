<?php

namespace Database\Seeders;

use App\Models\LawFirm;
use Illuminate\Database\Seeder;

class LawFirmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $lawFirms = [
            ['id' => 1, 'name' => 'Velo Legal'],
        ];
        foreach ($lawFirms as $lawFirm) {
            LawFirm::updateOrCreate(['id' => $lawFirm['id']], $lawFirm);
        }
    }
}
