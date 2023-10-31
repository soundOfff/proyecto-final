<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\Country;
use App\Models\Jurisdiction;
use App\Models\LawFirm;
use App\Models\Partner;
use App\Models\Project;
use App\Models\ProjectNote;
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
        Project::factory()
            ->for(ProjectStatus::all()->random(), 'status')
            ->for(Jurisdiction::all()->random())
            ->for(LawFirm::all()->random())
            ->for(Contact::all()->random(), 'responsiblePerson')
            ->for(Partner::factory()->for(Country::all()->random())->for(User::all()->random())->create(), 'defendant')
            ->for(Partner::factory()->for(Country::all()->random())->for(User::all()->random())->create(), 'plaintiff')
            ->has(ProjectNote::factory()->for(Staff::factory()->for(Role::all()->random())->create())->count(3), 'notes')
            ->has(Staff::factory()->for(Role::all()->random())->count(3))
            ->create();
    }
}
