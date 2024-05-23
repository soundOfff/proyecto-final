<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProcessRequest;
use App\Http\Resources\ProcessResource;
use App\Http\Resources\ProcessResourceCollection;
use App\Models\Process;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProcessController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(Process::class)
        ->allowedIncludes([
            'projectServiceType',
            'procedures.status',
            'procedures.responsible',
        ])
        ->allowedFilters([
            AllowedFilter::exact('project_service_type_id'),
        ]);

        $processes = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new ProcessResourceCollection($processes);
    }

    public function show(Process $process)
    {
        $process = QueryBuilder::for(Process::class)
        ->allowedIncludes([
            'projectServiceType',
            'procedures.status',
            'procedures.responsible',
        ])
        ->allowedFilters([
            AllowedFilter::exact('project_id'),
        ])
        ->find($process->id);

        return new ProcessResource($process);
    }

    public function store(ProcessRequest $request)
    {
        $newProcess = $request->validated();

        Process::create($newProcess);

        return response()->json(null, 201);
    }

    public function update(ProcessRequest $request, Process $process)
    {
        $updatedProcess = $request->validated();

        $process->update($updatedProcess);

        return response()->json(null, 204);
    }

    public function destroy(Process $process)
    {
        $process->procedures()->delete();
        $process->delete();

        return response()->json(null, 204);
    }
}
