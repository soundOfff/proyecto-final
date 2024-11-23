<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProcedurePathResourceCollection;
use App\Models\ProcedurePath;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ProcedurePathController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(ProcedurePath::class)
            ->allowedFilters(['from_procedure_id', 'to_procedure_id', 'conditional'])
            ->allowedIncludes(['fromProcedure', 'toProcedure']);

        $paths = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new ProcedurePathResourceCollection($paths);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'from_procedure_id' => 'required|exists:procedures,id',
            'to_procedure_id' => 'nullable|exists:procedures,id',
            'condition' => 'nullable|json',
        ]);

        ProcedurePath::create($validated);

        return response()->json(null, 201);
    }
}
