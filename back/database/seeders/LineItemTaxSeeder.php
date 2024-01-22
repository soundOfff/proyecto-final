<?php

namespace Database\Seeders;

use App\Models\LineItemTax;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class LineItemTaxSeeder extends Seeder
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
        $itemTaxes = $this->utils->csvToArray(database_path('imports/line_item_taxes.csv'));

        foreach ($itemTaxes as $item) {
            dump($item);
            LineItemTax::updateOrCreate(['id' => $item['id']], $item);
        }
    }
}
