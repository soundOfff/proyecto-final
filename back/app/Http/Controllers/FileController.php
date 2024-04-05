<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileRequest;
use App\Http\Resources\FileResource;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
use Spatie\QueryBuilder\QueryBuilder;

class FileController extends Controller
{
    public function show(File $file)
    {
        $file = QueryBuilder::for(File::class)
            ->allowedIncludes(['invoice', 'contact', 'staff', 'fileable', 'files'])
            ->find($file->id);

        return new FileResource($file);
    }

    public function store(FileRequest $request)
    {
        $data = $request->validated();
        $file = $request->file('file');

        $fileName = $file->getClientOriginalName();

        Storage::disk('google')->put($fileName, file_get_contents($file));
        $data['url'] = Storage::disk('google')->path($fileName);

        File::create($data);

        return response()->json(null, 201);
    }


    public function destroy(File $file) {
        Storage::disk('google')->delete($file->url); 
        $file->delete();
        return response()->json(null, 204);
    }
}
