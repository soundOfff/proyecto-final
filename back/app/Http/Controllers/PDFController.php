<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;

class PDFController extends Controller
{
    public function generatePDF(Request $request)
    {
        $doc_type = $request->get('document_type'); // To find the model
        $doc_id = $request->get('document_id');

        $model = 'App\Models\\' . ucfirst($doc_type);

        $model = $model::find($doc_id);

        abort_if(!$model, 404, 'Resource not found or class type is not correctly set');

        $model->lineItems->load('taxes');

        // If this get bigger refactor
        $endDate = $model->open_till ?? $model->expiry_date ?? $model->due_date;
        $number = $model->number ?? $model->id;
        $projectName = $model->project->name ?? $model->subject;
        $modelPartner = $model->partner ?? $model->proposable;
        $projectName = $model->project ? mb_strtoupper($model->project->name ?? "") : "N/A";

        $state = null;
        if ($modelPartner->jurisdiction) {
            $district = $modelPartner->jurisdiction->district;
            $state = mb_strtoupper("{$district->province->name}, {$district->name}, {$modelPartner->jurisdiction->name}");
        } elseif ($modelPartner->state) {
            $state = mb_strtoupper("{$modelPartner->state}, {$modelPartner->city}");
        } else {
            $state = mb_strtoupper($modelPartner->city) ?? null;
        }

        $partnerData = [
            'name' => mb_strtoupper($modelPartner->mergedName),
            'country' => mb_strtoupper($modelPartner->country->short_name) ?? null,
            'country_info' => mb_strtoupper($modelPartner->country->short_name) . ", " . $state,
            'address' => mb_strtoupper($model->partner->address) ?? null,
            'zip' => $modelPartner->zip ? "CO" . $modelPartner->zip : null,
            'phone' => $modelPartner->phone_number ?? null,
            'email' => mb_strtoupper($modelPartner->email) ?? null,
        ];

        $data = [
            'title' => mb_strtoupper($model::$SPANISH_CLASS_NAME),
            'start_date' => $model->date ?? now(),
            'end_date' => $endDate,
            'number' => $number,
            'total' => $model->total,
            'project_name' => mb_strtoupper($projectName),
            'items' => $model->lineItems,
            'partner' => $partnerData,
        ];

        $pdf = PDF::loadView('document', $data);
        return $pdf->stream("bill-" . now() . ".pdf", array("Attachment" => false));
    }
}
