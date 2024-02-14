<?php

namespace App\Http\Controllers;

use App\Http\Resources\DiscountTypeResourceCollection;
use App\Models\DiscountType;

class DiscountTypeController extends Controller
{
    public function index()
    {
        $discountTypes = DiscountType::all();

        return new DiscountTypeResourceCollection($discountTypes);
    }
}
