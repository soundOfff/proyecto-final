<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProcedureRequest;
use App\Http\Resources\ProcedureResource;
use App\Http\Resources\ProcedureResourceCollection;
use App\Models\Procedure;
use App\Models\Process;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProcedureController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(Procedure::class)
        ->allowedIncludes([
            'process',
            'status',
            'responsible',
        ])
        ->allowedFilters([
            AllowedFilter::exact('process_id'),
        ]);

        $processes = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new ProcedureResourceCollection($processes);
    }

    public function show(Procedure $procedure)
    {
        $procedure = QueryBuilder::for(Procedure::class)
            ->allowedIncludes([
                'process.procedures',
                'status',
                'responsible',
            ])
            ->find($procedure->id);

        return new ProcedureResource($procedure);
    }

    public function store(ProcedureRequest $request)
    {
        $newProcedure = $request->validated();
        $processId = $newProcedure['process_id'];
        $stepNumber = $newProcedure['step_number'];

        abort_if(
            Process::find($processId)->validateIfStepNumberExists($stepNumber),
            422,
            'Step number already exists'
        );

        Procedure::create($newProcedure);

        return response()->json(null, 201);
    }

    public function update(ProcedureRequest $request, Procedure $procedure)
    {
        $procedureUpdated = $request->validated();
        $processId = $procedureUpdated['process_id'];
        $stepNumber = $procedureUpdated['step_number'];

        abort_if(
            Process::find($processId)->validateIfStepNumberExists($stepNumber) &&
            $stepNumber != $procedure->step_number,
            422,
            'Step number already exists'
        );

        $procedure->update($procedureUpdated);

        return response()->json(null, 204);
    }

    public function destroy(Procedure $procedure)
    {
        $procedure->delete();

        return response()->json(null, 204);
    }
}
