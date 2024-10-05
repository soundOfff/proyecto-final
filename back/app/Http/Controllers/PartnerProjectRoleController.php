<?php

namespace App\Http\Controllers;

use App\Http\Resources\PartnerProjectRoleResourceCollection;
use App\Models\PartnerProjectRole;

class PartnerProjectRoleController extends Controller
{
    public function index()
    {
        $roles = PartnerProjectRole::all();

        return new PartnerProjectRoleResourceCollection($roles);
    }
}
