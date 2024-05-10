<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProcedureRequest;
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

    public function store(ProcedureRequest $request)
    {
        $newProcedure = $request->validated();

        abort_if(
            Process::find($newProcedure['process_id'])->validateIfStepNumberExists($newProcedure['step_number']),
            422,
            'Step number already exists'
        );

        Procedure::create($newProcedure);

        return response()->json(null, 201);
    }

    public function destroy(Procedure $procedure)
    {
        $procedure->delete();

        return response()->json(null, 204);
    }
}
