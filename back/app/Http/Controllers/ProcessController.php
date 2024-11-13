<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProcessRequest;
use App\Http\Resources\ProcessResource;
use App\Http\Resources\ProcessResourceCollection;
use App\Models\Process;
use App\Sorts\ProcessAuthorSort;
use App\Sorts\ProcessProjectServiceTypeSort;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
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
            'forks',
            'allForks',
            'author',
            'toNotify',
        ])
        ->allowedFilters([
            AllowedFilter::exact('project_service_type_id'),
        ])
        ->allowedSorts([
            'id',
            'name',
            'department',
            'description',
            AllowedSort::field('stepQuantity', 'step_quantity'),
            AllowedSort::field('createdAt', 'created_at'),
            AllowedSort::custom('projectServiceType', new ProcessProjectServiceTypeSort(), 'label'),
            AllowedSort::custom('author', new ProcessAuthorSort(), 'first_name'),
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
            'forks',
            'allForks',
            'author',
            'toNotify',
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
        $forkIds = array_column($newProcess['forks'], 'id');
        $staffs = array_column($newProcess['staffs'], 'id');

        $process = Process::create($newProcess);
        $process->forks()->sync($forkIds);
        $process->toNotify()->sync($staffs);

        return response()->json(null, 201);
    }

    public function update(ProcessRequest $request, Process $process)
    {
        $updatedProcess = $request->validated();
        $forkIds = array_column($updatedProcess['forks'], 'id');
        $staffs = array_column($updatedProcess['staffs'], 'id');

        $process->update($updatedProcess);
        $process->forks()->sync($forkIds);
        $process->toNotify()->sync($staffs);

        return response()->json(null, 204);
    }

    public function destroy(Process $process)
    {
        $process->procedures()->delete();
        $process->delete();

        return response()->json(null, 204);
    }
}
