<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProcedureRequest;
use App\Http\Resources\ProcedureResource;
use App\Http\Resources\ProcedureResourceCollection;
use App\Models\Procedure;
use App\Models\Process;
use Illuminate\Http\Request;
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
                'actions',
                'actions.type',
                'dependencies',
                'process.procedures',
                'author',
                'reminders.staff',
            ])
            ->allowedFilters([
                AllowedFilter::exact('process_id'),
            ])
            ->orderBy('step_number');

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
                'dependencies',
                'actions',
                'actions.type',
                'status',
                'author',
                'reminders.staff',
            ])
            ->find($procedure->id);

        return new ProcedureResource($procedure);
    }

    public function store(ProcedureRequest $request)
    {
        $newProcedure = $request->validated();
        $processId = $newProcedure['process_id'];
        $stepNumber = $newProcedure['step_number'];
        $dependencies = isset($newProcedure['dependencies']) ? $newProcedure['dependencies'] : [];
        $actions = isset($newProcedure['actions']) ? $newProcedure['actions'] : [];
        $reminders = isset($newProcedure['reminders']) ? $newProcedure['reminders'] : [];

        $dependenciesId = array_column($dependencies, 'id');

        abort_if(
            Process::find($processId)->validateIfStepNumberExists($stepNumber),
            422,
            'Step number already exists'
        );

        $procedure = Procedure::create($newProcedure);

        $procedure->actions()->createMany($actions);
        $procedure->reminders()->createMany($reminders);
        $procedure->dependencies()->sync($dependenciesId);

        return response()->json(null, 201);
    }

    public function update(ProcedureRequest $request, Procedure $procedure)
    {
        $procedureUpdated = $request->validated();
        $processId = $procedureUpdated['process_id'];
        $stepNumber = $procedureUpdated['step_number'];
        $dependencies = isset($procedureUpdated['dependencies']) ? $procedureUpdated['dependencies'] : null;
        $actions = isset($procedureUpdated['actions']) ? $procedureUpdated['actions'] : [];
        $reminders = isset($procedureUpdated['reminders']) ? $procedureUpdated['reminders'] : [];

        abort_if(
            Process::find($processId)->validateIfStepNumberExists($stepNumber) &&
                $stepNumber != $procedure->step_number,
            422,
            'Step number already exists'
        );

        $procedure->update($procedureUpdated);
        $procedure->actions()->delete();
        $procedure->reminders()->delete();
        $procedure->reminders()->createMany($reminders);
        $procedure->actions()->createMany($actions);

        if ($dependencies) {
            $dependenciesId = array_column($dependencies, 'id');
            $procedure->dependencies()->sync($dependenciesId);
        }

        return response()->json(null, 204);
    }

    public function destroy(Procedure $procedure)
    {
        abort_if($procedure->dependencies()->exists(), 422, 'Eliminar las dependencias primero');

        $procedure->delete();

        return response()->json(null, 204);
    }

    public function editSteps(Request $request)
    {
        $data = $request->validate([
            'procedures' => 'required|array',
            'procedures.*.id' => 'required|exists:procedures,id',
            'procedures.*.stepNumber' => 'required|integer',
        ]);

        $procedures = $data['procedures'];

        foreach ($procedures as $procedure) {
            $procedureToUpdate = Procedure::find($procedure['id']);
            $procedureToUpdate->update(['step_number' => $procedure['stepNumber']]);
        }

        return response()->json(null, 204);
    }
}
