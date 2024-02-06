<?php

namespace Database\Seeders;

use App\Models\LineItem;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class LineItemSeeder extends Seeder
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
        $lineItems = $this->utils->csvToArray(database_path('imports/line_items.csv'));

        foreach ($lineItems as $lineItem) {
            dump($lineItem);
            LineItem::updateOrCreate(['id' => $lineItem['id']], $lineItem);
        }
    }
}
