<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
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
        $countries = $this->utils->csvToArray(database_path('imports/countries.csv'));

        foreach ($countries as $country) {
            Country::updateOrCreate(['id' => $country['id']], $country);
        }
    }
}
