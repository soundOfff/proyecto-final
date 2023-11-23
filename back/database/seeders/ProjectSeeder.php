<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\Country;
use App\Models\Jurisdiction;
use App\Models\LawFirm;
use App\Models\Partner;
use App\Models\Project;
use App\Models\ProjectBillingType;
use App\Models\ProjectMember;
use App\Models\ProjectNote;
use App\Models\ProjectServiceType;
use App\Models\ProjectStage;
use App\Models\ProjectStageType;
use App\Models\ProjectStatus;
use App\Models\Role;
use App\Models\Staff;
use App\Models\User;
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
        collect(range(1, 10))
            ->each(function () {
                $project = Project::factory()
                    ->for(ProjectStatus::all()->random(), 'status')
                    ->for(Jurisdiction::all()->random())
                    ->for(LawFirm::all()->random())
                    ->for(ProjectBillingType::all()->random(), 'billingType')
                    ->for(ProjectServiceType::all()->random(), 'serviceType')
                    ->for(Partner::all()->random(), 'responsiblePerson')
                    ->for(Partner::all()->random(), 'defendant')
                    ->for(Partner::all()->random(), 'plaintiff')
                    ->has(ProjectNote::factory()->for(Staff::all()->random())->count(3), 'notes')
                    ->has(ProjectStage::factory()
                        ->for(Staff::all()->random())
                        ->for(ProjectStageType::all()->random(), 'type')
                        ->count(3),
                        'stages'
                    )
                    ->has(ProjectMember::factory()->for(Staff::all()->random())->count(3), 'members')
                    ->create();

                $project->staffs()->attach(Staff::inRandomOrder()->take(3)->pluck('id'));
            });
    }
}
