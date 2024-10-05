<?php

namespace App\Http\Controllers;

use App\Http\Resources\EstimateStatusResourceCollection;
use App\Models\EstimateStatus;

class EstimateStatusController extends Controller
{
    public function index()
    {
        $statuses = EstimateStatus::all();

        return new EstimateStatusResourceCollection($statuses);
    }
}
