<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use App\Models\Project;
use Illuminate\Http\Request;
use PDF;

class PDFController extends Controller
{
    public function generatePDF(Request $request)
    {
        $doc_type = $request->get('document_type'); // To find the model
        $doc_id = $request->get('document_id');

        $model = 'App\Models\\'.ucfirst($doc_type);

        $model = $model::find($doc_id);

        abort_if(! $model, 404, 'Resource not found or class type is not correctly set');

        $model->lineItems->load('taxes');

        // If this get bigger refactor
        $endDate = $model->open_till ?? $model->expiry_date ?? $model->due_date;
        $number = $model->number ?? $model->id;
        $projectName = $model->project->name ?? $model->subject;
        $modelPartner = $model->partner ?? $model->proposable;
        $projectName = $model->project ? mb_strtoupper($model->project->name ?? '') : null;

        $state = null;
        if ($modelPartner->jurisdiction) {
            $district = $modelPartner->jurisdiction->district;
            $state = mb_strtoupper("{$district->province->name}, {$district->name}, {$modelPartner->jurisdiction->name}");
        } elseif ($modelPartner->state) {
            $state = mb_strtoupper("{$modelPartner->state}, {$modelPartner->city}");
        } else {
            $state = mb_strtoupper($modelPartner->city ?? '') ?? null;
        }

        $partnerData = [
            'name' => mb_strtoupper($modelPartner->mergedName),
            'country' => mb_strtoupper($modelPartner->country->short_name),
            'country_info' => mb_strtoupper($modelPartner->country->short_name).', '.$state,
            'address' => mb_strtoupper($model->partner->address ?? ''),
            'zip' => $modelPartner->zip ? 'CO'.$modelPartner->zip : null,
            'phone' => $modelPartner->phone_number ?? null,
            'email' => mb_strtoupper($modelPartner->email ?? null),
        ];

        $data = [
            'type' => class_basename($model),
            'title' => mb_strtoupper($model::$SPANISH_CLASS_NAME),
            'start_date' => $model->date ?? now(),
            'end_date' => $endDate,
            'number' => $number,
            'total' => $model->total,
            'project_name' => mb_strtoupper($projectName),
            'items' => $model->lineItems,
            'partner' => $partnerData,
            'notes' => $model->client_note ?? 'No se encontraron notas para este documento',
            'terms' => $model->terms ?? 'No se encontraron terminos y condiciones para este documento',
        ];

        $pdf = PDF::loadView('document', $data);

        return $pdf->stream('bill-'.now().'.pdf', ['Attachment' => false]);
    }

    public function generateBalancePDF(Project $project)
    {
        $modelPartner = $project->billablePartner()->first();

        $partnerData = [
            'name' => mb_strtoupper($modelPartner->company ?? $modelPartner->name ?? 'SIN NOMBRE'),
            'country' => mb_strtoupper($modelPartner->country->short_name ?? 'DESCONOCIDO'),
            'country_info' => mb_strtoupper(($modelPartner->country->short_name ?? 'DESCONOCIDO').', '.($modelPartner->state ?? '')),
            'address' => mb_strtoupper($modelPartner->address ?? 'SIN DIRECCIÓN'),
            'zip' => $modelPartner->zip ? 'CO'.$modelPartner->zip : null,
            'phone' => $modelPartner->phone_number ?? 'SIN TELÉFONO',
            'email' => mb_strtoupper($modelPartner->email ?? 'SIN EMAIL'),
        ];

        $totalPaid = $project->totalPaid();

        $totalBilled = $project->totalBilledCost();

        $total = $totalPaid - $totalBilled;

        $data = [
            'project' => $project,
            'partner' => $partnerData,
            'items' => $project->invoices,
            'total' => $total,
            'total_billed' => $totalBilled,
            'total_paid' => $totalPaid,
        ];

        $pdf = PDF::loadView('balance', $data);

        return $pdf->stream('balance-'.now()->format('Y-m-d').'.pdf', ['Attachment' => false]);
    }

    public function generatePartnerPDF(Partner $partner)
    {
        $partnerData = [
            'name' => mb_strtoupper($partner->company ?? $partner->name ?? 'SIN NOMBRE'),
            'country' => mb_strtoupper($partner->country->short_name ?? 'DESCONOCIDO'),
            'country_info' => mb_strtoupper(($partner->country->short_name ?? 'DESCONOCIDO').', '.($partner->state ?? '')),
            'address' => mb_strtoupper($partner->address ?? 'SIN DIRECCIÓN'),
            'zip' => $partner->zip ? 'CO'.$partner->zip : null,
            'phone' => $partner->phone_number ?? 'SIN TELÉFONO',
            'email' => mb_strtoupper($partner->email ?? 'SIN EMAIL'),
        ];

        $totalBilled = $partner->totalBilledCost();
        $totalPaid = $partner->totalPaid();
        $total = $totalPaid - $totalBilled;

        $items = $partner->projects()->get()->map(function ($project) {
            return [
                'name' => $project->name,
                'paid' => $project->totalPaid(),
                'billed' => $project->totalBilledCost(),
                'total' => $project->totalPaid() - $project->totalBilledCost(),
            ];
        });

        $data = [
            'partner' => $partner,
            'items' => $items,
            'total_billed' => $totalBilled,
            'total_paid' => $totalPaid,
            'total' => $total,
        ];

        $pdf = PDF::loadView('partner-balance', $data);

        return $pdf->stream('balance-'.now()->format('Y-m-d').'.pdf', ['Attachment' => false]);
    }
}
