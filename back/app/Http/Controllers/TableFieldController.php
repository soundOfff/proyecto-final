<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TableFieldController extends Controller
{
    public function __invoke(Request $request)
    {
        $fields = [];
        $columns = DB::select("SHOW COLUMNS FROM $request->table");
        foreach ($columns as $column) {
            $fields[] = ['table' => $request->table, 'field' => $column->Field];
        }

        return response()->json($fields);
    }
}
