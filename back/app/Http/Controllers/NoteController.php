<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteRequest;
use App\Http\Resources\NoteResourceCollection;
use App\Models\Note;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class NoteController extends Controller
{
    public function index()
    {
        $notes = QueryBuilder::for(Note::class)
            ->allowedFilters([
                AllowedFilter::exact('notable_id'),
                AllowedFilter::exact('notable_type'),
            ])
            ->orderBy('created_at', 'desc')
            ->get();

        return new NoteResourceCollection($notes);
    }

    public function store(NoteRequest $request)
    {
        $newNote = $request->validated();

        $note = Note::create($newNote);

        return response()->json($note, 201);
    }

    public function destroy(Note $note)
    {
        $note->delete();

        return response()->json(null, 204);
    }
}
