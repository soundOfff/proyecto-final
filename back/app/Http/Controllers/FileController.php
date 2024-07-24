<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileRequest;
use App\Http\Resources\FileResource;
use App\Http\Resources\FileResourceCollection;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
use Spatie\QueryBuilder\QueryBuilder;

class FileController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(File::class)
            ->allowedIncludes(['invoice', 'contact', 'staff', 'fileable'])
            ->allowedFilters(['fileable_id', 'fileable_type']);

        $files = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new FileResourceCollection($files);
    }

    public function show(File $file)
    {
        $file = QueryBuilder::for(File::class)
            ->allowedIncludes(['fileable', 'files'])
            ->find($file->id);

        return new FileResource($file);
    }

    public function store(FileRequest $request)
    {
        $data = $request->validated();
        $file = $request->file('file');
        $path = $request->get('path');
        $name = $request->get('name');

        Storage::disk('google')->put($path . $name . '.' . $file->extension(), file_get_contents($file));

        $data['url'] = Storage::disk('google')->path('/' . $path . $name . '.' . $file->extension());
        $data['subject'] = $name;

        File::create($data);

        return response()->json(null, 201);
    }

    public function destroy(File $file)
    {
        Storage::disk('google')->delete($file->url);
        $file->delete();

        return response()->json(null, 204);
    }
}
