<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProcedureStatusResourceCollection;
use App\Models\ProcedureStatus;
use Spatie\QueryBuilder\QueryBuilder;

class ProcedureStatusController extends Controller
{
    public function index()
    {
        $statuses = QueryBuilder::for(ProcedureStatus::class)->get();

        return new ProcedureStatusResourceCollection($statuses);
    }
}
