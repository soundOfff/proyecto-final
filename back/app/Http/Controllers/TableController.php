<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TableController extends Controller
{
    public function __invoke()
    {
        $tablesExcluded = [
            'migrations',
            'password_resets',
            'failed_jobs',
            'users',
            'oauth_access_tokens',
            'personal_access_tokens',
        ];

        $query = DB::select('SHOW TABLES');

        $tables = array_map(function ($table) {
            return $table->{'Tables_in_'.env('DB_DATABASE')};
        }, $query);

        $tables = array_values(array_diff($tables, $tablesExcluded));

        return response()->json($tables);
    }
}
