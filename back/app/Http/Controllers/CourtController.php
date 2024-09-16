<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourtRequest;
use App\Http\Resources\CourtResource;
use App\Http\Resources\CourtResourceCollection;
use App\Models\Court;
use Spatie\QueryBuilder\QueryBuilder;

class CourtController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Court::class)
        ->allowedIncludes([
            'projects',
        ])
        ->orderBy('id', 'desc');

        $contacts = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new CourtResourceCollection($contacts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CourtRequest $request)
    {
        $newCourt = $request->validated();

        Court::create($newCourt);

        return response()->json(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Court $court)
    {
        $court = QueryBuilder::for(Court::class)
        ->allowedIncludes([
            'projects',
        ])
        ->find($court->id);

        return new CourtResource($court);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CourtRequest $request, Court $court)
    {
        $updatedCourt = $request->validated();

        $court->update($updatedCourt);

        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Court $court)
    {
        $court->delete();

        return response()->json(null, 204);
    }
}
