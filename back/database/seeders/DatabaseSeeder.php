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
        $this->call(ContactSeeder::class);
        $this->call(ProjectBillingTypeSeeder::class);
        $this->call(ProjectServiceTypeSeeder::class);
        $this->call(ProjectStageTypeSeeder::class);
        $this->call(ProjectSeeder::class);
        $this->call(ExpenseCategorySeeder::class);
        $this->call(InvoiceSeeder::class);
        $this->call(CurrencySeeder::class);
        $this->call(EstimateSeeder::class);
        $this->call(TaxSeeder::class);
        $this->call(PaymentMethodSeeder::class);
        $this->call(ExpenseRepeatSeeder::class);
        $this->call(ExpenseSeeder::class);
        $this->call(ProjectNoteSeeder::class);
        $this->call(ProjectMemberSeeder::class);
        $this->call(ItemGroupSeeder::class);
        $this->call(ItemSeeder::class);
        $this->call(LineItemSeeder::class);
        $this->call(LineItemTaxSeeder::class);
        $this->call(TagSeeder::class);
        $this->call(TaggableSeeder::class);
    }
}
