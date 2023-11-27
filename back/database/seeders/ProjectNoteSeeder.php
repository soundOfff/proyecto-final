<?php

namespace Database\Seeders;

use App\Models\ProjectNote;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class ProjectNoteSeeder extends Seeder
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
        $projectNotes = $this->utils->csvToArray(database_path('imports/project_notes.csv'));

        foreach ($projectNotes as $projectNote) {
            ProjectNote::updateOrCreate(['id' => $projectNote['id']], $projectNote);
        }
    }
}
