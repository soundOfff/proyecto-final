<?php

namespace Database\Seeders;

use App\Models\Estimate;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class EstimateSeeder extends Seeder
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
        $estimates = $this->utils->csvToArray(database_path('imports/estimates.csv'));

        foreach ($estimates as $estimate) {
            Estimate::updateOrCreate(['id' => $estimate['id']], $estimate);
        }
    }
}
