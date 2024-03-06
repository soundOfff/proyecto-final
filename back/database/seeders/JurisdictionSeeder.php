<?php

namespace Database\Seeders;

use App\Models\Jurisdiction;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class JurisdictionSeeder extends Seeder
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
        $jurisdictions = $this->utils->csvToArray(database_path('imports/jurisdictions.csv'));

        foreach ($jurisdictions as $jurisdiction) {
            Jurisdiction::updateOrCreate(['id' => $jurisdiction['id']], $jurisdiction);
        }
    }
}
