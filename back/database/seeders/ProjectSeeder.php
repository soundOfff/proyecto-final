<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
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
        $projects = $this->utils->csvToArray(database_path('imports/projects.csv'));

        foreach ($projects as $project) {
            Project::updateOrCreate(['id' => $project['id']], $project);
        }
    }
}
