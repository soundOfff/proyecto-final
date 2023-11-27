<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);
        $this->call(StaffSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ProjectStatusSeeder::class);
        $this->call(CountrySeeder::class);
        $this->call(JurisdictionSeeder::class);
        $this->call(LawFirmSeeder::class);
        $this->call(PartnerSeeder::class);
        $this->call(ProjectBillingTypeSeeder::class);
        $this->call(ProjectServiceTypeSeeder::class);
        $this->call(ProjectStageTypeSeeder::class);
        $this->call(ProjectSeeder::class);
        $this->call(ProjectNoteSeeder::class);
    }
}
