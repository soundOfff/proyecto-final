<?php

namespace Database\Seeders;

use App\Models\ProjectMember;
use App\Services\Utils;
use Illuminate\Database\Seeder;

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
            ProjectMember::updateOrCreate(['id' => $member['id']], $member);
        }
    }
}
