<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectMember;
use App\Services\Utils;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectMemberSeeder extends Seeder
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
        $projectMembers = $this->utils->csvToArray(database_path('imports/project_members.csv'));

        foreach ($projectMembers as $member) {
            Project::find($member['project_id'])->members()->attach($member['staff_id']);
        }
    }
}
