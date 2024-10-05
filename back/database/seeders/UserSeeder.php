<?php

namespace Database\Seeders;

use App\Models\User;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
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
        $users = $this->utils->csvToArray(database_path('imports/users.csv'));

        foreach ($users as $user) {
            User::updateOrCreate(['id' => $user['id']], $user);
        }
    }
}
