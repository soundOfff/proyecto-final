<?php

namespace App\Http\Controllers;

use App\Services\DocassembleService;

class DocumentController extends Controller
{
    public function __construct(
        protected DocassembleService $docassembleService
    ) {
    }

    public function generate()
    {
        $url = $this->docassembleService->createDocument();

        return response()->json(['url' => $url]);
    }
}
