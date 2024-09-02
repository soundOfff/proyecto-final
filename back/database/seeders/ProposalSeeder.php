<?php

namespace Database\Seeders;

use App\Models\Proposal;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class ProposalSeeder extends Seeder
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
        $proposals = $this->utils->csvToArray(database_path('imports/proposals.csv'));

        foreach ($proposals as $proposal) {
            Proposal::updateOrCreate(['id' => $proposal['id']], $proposal);
        }
    }
}
