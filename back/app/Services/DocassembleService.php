<?php

namespace App\Services;

use App\Models\Partner;
use App\Models\Project;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use NumberToWords\NumberToWords;

class DocassembleService
{
    public function __construct(protected FileService $fileService)
    {
    }

    public function createDocument(Project $project)
    {
        $defendant = $project->getDefendants()->first();
        $plaintiff = $project->getPlaintiffs()->first();
        abort_if(! $plaintiff->pivot, 404, 'Apoderado no encontrado');
        $representative = $plaintiff->relatedPartners()->find($plaintiff->pivot->owner_id);

        $defendant->validate(Partner::$defendantDocumentRules, 'demandado');
        $plaintiff->validate(Partner::$plaintiffDocumentRules, 'demandante');
        $representative->validate(Partner::$representativeDocumentRules, 'apoderado');

        $variables = [
            // Representative data
            'apoderado_nombre_completo' => $representative->merged_name,
            'apoderado_corregimiento' => $representative->jurisdiction->name,
            'apoderado_distrito' => $representative->jurisdiction->district->name,
            'apoderado_provincia' => $representative->jurisdiction->district->province->name,
            'apoderado_direccion' => $representative->address,
            'apoderado_estado_civil' => $representative->civil_status,
            'apoderado_genero' => $representative->is_male ? 'Masculino' : 'Femenino',
            'apoderado_nacionalidad' => $representative->country->nationality,
            'apoderado_numero_id' => $representative->id_number,
            'apoderado_tipo_id' => $representative->id_type,
            'apoderado_ocupacion' => $representative->occupation,

            // Representative pivot data
            'apoderado_entrada' => $representative->pivot->check_in,
            'apoderado_escritura' => $representative->pivot->deed,
            'apoderado_notaria' => $representative->pivot->notary,
            'apoderado_escritura_fecha' => $representative->pivot->deed_date,
            'apoderado_asiento' => $representative->pivot->seat,
            'apoderado_circuito' => $representative->pivot->legal_circuit,
            'apoderado_ficha' => $representative->pivot->sheet,

            // Plaintiff data
            'demandante' => $plaintiff->merged_name,
            'demandante_nombre_completo' => $plaintiff->merged_name,
            'demandante_corregimiento' => $plaintiff->jurisdiction->name,
            'demandante_distrito' => $plaintiff->jurisdiction->district->name,
            'demandante_provincia' => $plaintiff->jurisdiction->district->province->name,
            'demandante_direccion' => $plaintiff->address,
            'demandante_telefono' => $plaintiff->phone_number,
            'demandante_ficha' => $plaintiff->file_number,
            'demandante_imagen' => $plaintiff->image_number,
            'demandante_rollo' => $plaintiff->roll_number,

            // Defendant data
            'demandado' => $defendant->merged_name,
            'demandado_corregimiento' => $defendant->jurisdiction->name,
            'demandado_distrito' => $defendant->jurisdiction->district->name,
            'demandado_provincia' => $defendant->jurisdiction->district->province->name,
            'demandado_direccion' => $defendant->address,
            'demandado_genero' => $defendant->is_male ? 'Masculino' : 'Femenino',
            'demandado_nacionalidad' => $defendant->country->nationality,
            'demandado_nombre_completo' => $defendant->merged_name,
            'demandado_numero_id' => $defendant->id_number,
            'demandado_tipo_id' => $defendant->id_type,

            'nombre_proceso' => $project->process->name,
            'proceso_monto' => $project->demand_amount,
            'proceso_monto_escrito' => (new NumberToWords())->getNumberTransformer('es')->toWords($project->demand_amount ?? 0),
            'circuito_municipal' => 'Something', // TODO: Replace with actual data
            'circuito_numero' => 'Something',
        ];

        $i = config('services.docassemble.index');
        $key = config('services.docassemble.key');

        $credentials = Http::docassemble()
            ->withQueryParameters([
                'i' => $i,
                'key' => $key,
            ])->get('/session/new')
            ->json();

        $session = $credentials['session'];
        $secret = $credentials['secret'];

        $interview = Http::docassemble()
            ->post('/session',
                [
                    'i' => $i,
                    'key' => $key,
                    'session' => $session,
                    'secret' => $secret,
                    'variables' => $variables,
                    'file_number' => 0,
                ]
            )
            ->json();

        $fileNumber = $interview['attachments'][0]['number']['pdf'];

        $file = Http::docassemble()
            ->withQueryParameters([
                'i' => $i,
                'key' => $key,
                'session' => $session,
                'secret' => $secret,
                'extension' => 'pdf',
            ])
            ->withUrlParameters([
                'file_number' => $fileNumber,
            ])
            ->get('/file/{file_number}');

        $tempPath = tempnam(sys_get_temp_dir(), 'test');
        file_put_contents($tempPath, $file->body());

        Storage::disk('google')->put('acta_sociedad_fiadora.pdf', file_get_contents($tempPath));

        $url = $this->fileService->getPublicUrl('acta_sociedad_fiadora.pdf');

        return $url;
    }
}
