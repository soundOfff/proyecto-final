<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubServiceTypeResourceCollection;
use App\Models\SubServiceType;

class SubServiceTypeController extends Controller
{
    public function index()
    {
        $subServiceTypes = SubServiceType::all();

        return new SubServiceTypeResourceCollection($subServiceTypes);
    }
}
