<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequestTemplateRequest;
use App\Http\Resources\RequestTemplateResource;
use App\Http\Resources\RequestTemplateResourceCollection;
use App\Models\RequestTemplate;
use Spatie\QueryBuilder\QueryBuilder;

class RequestTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(RequestTemplate::class);

        $templates = request()->has('perPage')
        ? $query->paginate((int) request('perPage'))
        : $query->get();

        return new RequestTemplateResourceCollection($templates);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestTemplateRequest $request)
    {
        $newTemplate = $request->validated();

        RequestTemplate::create($newTemplate);

        return response()->json(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(RequestTemplate $requestTemplate)
    {
        $requestTemplate = QueryBuilder::for(RequestTemplate::class)
            ->find($requestTemplate->id);

        return new RequestTemplateResource($requestTemplate);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RequestTemplateRequest $request, RequestTemplate $requestTemplate)
    {
        $updatedTemplate = $request->validated();

        $requestTemplate->update($updatedTemplate);

        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RequestTemplate $requestTemplate)
    {
        $requestTemplate->delete();

        return response()->json(null, 204);
    }
}
