<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemGroupRequest;
use App\Http\Resources\ItemGroupResourceCollection;
use App\Models\ItemGroup;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ItemGroupController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups =  QueryBuilder::for(ItemGroup::class)->get();

        return new ItemGroupResourceCollection($groups);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ItemGroupRequest $request)
    {
        $newGroup = $request->validated();
        $group = ItemGroup::create($newGroup);
        return response()->json($group, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ItemGroup $itemGroup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ItemGroup $itemGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ItemGroup $itemGroup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ItemGroup $itemGroup)
    {
        //
    }
}
