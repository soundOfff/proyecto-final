<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Services\Utils;
use Database\Factories\ItemFactory;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ItemFactory::new()->count(10)->create();
    }
}
