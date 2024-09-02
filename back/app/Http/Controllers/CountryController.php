<?php

namespace App\Http\Controllers;

use App\Http\Resources\CountrySelectResourceCollection;
use App\Models\Country;

class CountryController extends Controller
{
    public function select()
    {
        $countries = Country::all();

        return new CountrySelectResourceCollection($countries);
    }
}
