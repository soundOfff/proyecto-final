<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Services\DocassembleService;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function __construct(
        protected DocassembleService $docassembleService
    ) {
    }

    public function generate(Request $request)
    {
        $projectId = $request->get('project_id');
        $project = Project::findOrFail($projectId);

        $url = $this->docassembleService->createDocument($project);

        $project->update(['document_url' => $url]);

        return response()->json(['url' => $url]);
    }
}
