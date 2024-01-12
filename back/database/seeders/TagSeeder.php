<?php

namespace Database\Seeders;

use App\Models\Tag;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
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
        $tags = $this->utils->csvToArray(database_path('imports/tags.csv'));

        foreach ($tags as $tag) {
            Tag::updateOrCreate(['id' => $tag['id']], $tag);
        }
    }
}
