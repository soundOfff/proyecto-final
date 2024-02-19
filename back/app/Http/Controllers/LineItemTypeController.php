<?php

namespace App\Http\Controllers;

use App\Http\Resources\LineItemTypeResourceCollection;
use App\Models\LineItemType;

class LineItemTypeController extends Controller
{
    public function index()
    {
        $lineItemTypes = LineItemType::all();

        return new LineItemTypeResourceCollection($lineItemTypes);
    }
}
