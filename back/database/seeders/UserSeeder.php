<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\Role;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()
            ->for(Role::all()->random())
            ->has(
                Contact::factory()
                    ->for(
                        Staff::factory()
                            ->for(Role::all()->random())
                            ->create()
                    )
                    ->count(3)
            )
            ->count(10)
            ->create();
    }
}
