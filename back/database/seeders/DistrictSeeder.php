<?php

namespace Database\Seeders;

use App\Models\District;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class DistrictSeeder extends Seeder
{
    private $utils;

    public function __construct(Utils $utils = null)
    {
        $this->utils = $utils;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $districts = $this->utils->csvToArray(database_path('imports/districts.csv'));

        foreach ($districts as $district) {
            District::updateOrCreate(['id' => $district['id']], $district);
        }
    }
}
