<?php

namespace Database\Seeders;

use App\Models\ProposalComment;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class ProposalCommentSeeder extends Seeder
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
        $comments = $this->utils->csvToArray(database_path('imports/proposal_comments.csv'));

        foreach ($comments as $comment) {
            ProposalComment::updateOrCreate(['id' => $comment['id']], $comment);
        }
    }
}
