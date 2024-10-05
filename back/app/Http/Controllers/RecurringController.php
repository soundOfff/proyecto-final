<?php

namespace App\Http\Controllers;

use App\Http\Resources\RecurringResourceCollection;
use App\Models\Recurring;

class RecurringController extends Controller
{
    public function index()
    {
        $recurrings = Recurring::all();

        return new RecurringResourceCollection($recurrings);
    }
}
