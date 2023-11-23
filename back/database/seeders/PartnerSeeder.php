<?php

namespace Database\Seeders;

use App\Models\Partner;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
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
        $partners = $this->utils->csvToArray(database_path('imports/partners.csv'));

        foreach ($partners as $partner) {
            Partner::updateOrCreate(['id' => $partner['id']], $partner);
        }
    }
}
