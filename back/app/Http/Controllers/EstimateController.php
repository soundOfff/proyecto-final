<?php

namespace App\Http\Controllers;

use App\Http\Requests\EstimateRequest;
use App\Http\Resources\EstimateResourceCollection;
use App\Models\Estimate;
use App\Models\LineItem;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class EstimateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Estimate::class)
        ->allowedIncludes([
            'partner',
            'project.serviceType',
            'currency',
            'invoice',
            'billingCountry',
            'shippingCountry',
        ])
        ->orderBy('id', 'desc');

        $estimates = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new EstimateResourceCollection($estimates);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EstimateRequest $request)
    {
        $newEstimate = $request->validated();
        $items = $newEstimate['items'];

        $estimate = Estimate::create($newEstimate);

        foreach ($items as $item) {
            $item['line_itemable_id'] = $estimate->id;
            $item['line_itemable_type'] = 'estimates';
            LineItem::create($item);
        }

        return response()->json(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Estimate $estimate)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Estimate $estimate)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estimate $estimate)
    {
        //
    }
}
