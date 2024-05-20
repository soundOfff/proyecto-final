<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProcessResource;
use App\Http\Resources\ProcessResourceCollection;
use App\Models\Process;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProcessController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(Process::class)
        ->allowedIncludes([
            'project',
            'procedures.status',
            'procedures.responsible',
        ])
        ->allowedFilters([
            AllowedFilter::exact('project_id'),
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
            'project',
            'procedures.status',
            'procedures.responsible',
        ])
        ->allowedFilters([
            AllowedFilter::exact('project_id'),
        ])
        ->find($process->id);

        return new ProcessResource($process);
    }

    public function store(Request $request)
    {
        $process = Process::create(request()->all());

        return response()->json(null, 201);
    }

    public function destroy(Process $process)
    {
        $process->delete();

        return response()->json(null, 204);
    }
}
