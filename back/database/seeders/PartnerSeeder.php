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
        $consolidators = array_map(fn ($partner) => ['user_id' => $partner['user_id'], 'consolidator_id' => $partner['consolidator_id']], $partners);

        foreach ($partners as $partner) {
            unset($partner['consolidator_id']);
            Partner::updateOrCreate(['id' => $partner['user_id']], $partner);
        }

        foreach ($consolidators as $consolidator) {
            Partner::where('user_id', $consolidator['user_id'])->update(['consolidator_id' => $consolidator['consolidator_id']]);
        }
    }
}
