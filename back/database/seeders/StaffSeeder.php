<?php

namespace Database\Seeders;

use App\Models\Staff;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class StaffSeeder extends Seeder
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
        $staff = $this->utils->csvToArray(database_path('imports/staff.csv'));

        foreach ($staff as $newStaff) {
            Staff::updateOrCreate(['id' => $newStaff['id']], $newStaff);
        }
    }
}
