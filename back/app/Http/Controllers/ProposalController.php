<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProposalResource;
use App\Http\Resources\ProposalResourceCollection;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ProposalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Proposal::class)
        ->allowedIncludes([
            'currency',
            'estimate',
            'invoice',
            'status',
            'lineItems.taxes',
            'tags',
            'proposable',
            'comments',
        ])
        ->orderBy('id', 'desc');

        $proposals = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new ProposalResourceCollection($proposals);
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
        $proposal = QueryBuilder::for(Proposal::class)
        ->allowedIncludes([
            'currency',
            'estimate',
            'invoice',
            'lineItems.taxes',
            'tags',
        ])
        ->find($proposal->id);

        return new ProposalResource($proposal);
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
