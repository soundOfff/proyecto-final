<?php

namespace Database\Seeders;

use App\Models\Taggable;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class TaggableSeeder extends Seeder
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
        $taggables = $this->utils->csvToArray(database_path('imports/taggable.csv'));

        foreach ($taggables as $taggable) {
            Taggable::updateOrCreate(['id' => isset($taggable['id']) ? $taggable['id'] : null], $taggable);
        }
    }
}
