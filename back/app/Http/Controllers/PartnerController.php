<?php

namespace App\Http\Controllers;

use App\Http\Resources\PartnerSelectResourceCollection;
use App\Models\Partner;
use App\Models\Project;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function select()
    {
        $partners = Partner::all();

        return new PartnerSelectResourceCollection($partners);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
