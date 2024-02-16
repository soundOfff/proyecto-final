<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function show()
    {
        Storage::disk('google')->put('test.txt', 'testing afadfadsfdsafd');

        return response()->json();
    }

    public function store()
    {
        Storage::disk('google')->put('test.txt', 'testing afadfadsfdsafd');

        return response()->json();
    }
}
