<?php

namespace Database\Seeders;

use App\Models\Partner;
use App\Models\PartnerProjectRole;
use App\Models\Project;
use App\Models\ProjectBillingType;
use App\Models\ProjectStatus;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Project::factory()
            ->count(10)
            ->withRandomRelations()
            ->create();
    }
}
