<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
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
        $items = $this->utils->csvToArray(database_path('imports/items.csv'));

        foreach ($items as $item) {
            dump($item);
            Item::updateOrCreate(['id' => $item['id']], $item);
        }
    }
}
