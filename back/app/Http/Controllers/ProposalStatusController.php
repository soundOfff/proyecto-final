<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProposalStatusResourceCollection;
use App\Models\Proposal;
use App\Models\ProposalStatus;
use Illuminate\Http\Request;

class ProposalStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $statuses = ProposalStatus::all();

        return new ProposalStatusResourceCollection($statuses);
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
    public function show(Proposal $proposal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proposal $proposal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proposal $proposal)
    {
        //
    }
}
