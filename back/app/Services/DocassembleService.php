<?php

namespace App\Services;

use App\Models\Partner;
use App\Models\Project;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class DocassembleService
{
    public function __construct(protected FileService $fileService)
    {
    }

    private function concatenateProperties($items, array $mapping): array
    {
        $prevData = [];

        // Initialize prevData with empty strings on mapping
        foreach ($mapping as $property => $outputKey) {
            $prevData[$outputKey] = '';
        }

        foreach ($items as $item) {
            foreach ($mapping as $property => $outputKey) {
                // $property = 'jurisdiction->name', $outputKey = 'demandado_corregimiento'
                $value = $this->getPropertyValue($item, $property);
                $prevData[$outputKey] .= ($prevData[$outputKey] ? ', ' : '').$value;
            }
        }

        return $prevData;
    }

    // Helper function
    private function getPropertyValue($item, $property)
    {
        $properties = explode('->', $property);
        $value = $item;

        foreach ($properties as $prop) {
            if (isset($value->{$prop})) {
                $value = $value->{$prop};
            } else {
                return '';  // Return empty string if property not found
            }
        }

        return $value;
    }

    private function getDefendantsData($defendants): array
    {
        $mapping = [
            'merged_name' => 'demandado_nombre_completo',
            'is_male' => 'demandado_genero',
            'id_number' => 'demandado_numero_id',
            'id_type' => 'demandado_tipo_id',
            'jurisdiction->name' => 'demandado_corregimiento',
            'jurisdiction->district->name' => 'demandado_distrito',
            'jurisdiction->district->province->name' => 'demandado_provincia',
            'address' => 'demandado_direccion',
            'country->nationality' => 'demandado_nacionalidad',
        ];

        $data = $this->concatenateProperties($defendants, $mapping);

        // Special handling for gender
        foreach ($defendants as $defendant) {
            $gender = $defendant->is_male ? 'Masculino' : 'Femenino';
            $data['demandado_genero'] .= ($data['demandado_genero'] ? ', ' : '').$gender;
        }

        return $data;
    }

    private function getPlaintiffsData($plaintiffs): array
    {
        $plaintiffsData = [];
        foreach ($plaintiffs as $plaintiff) {
            $plaintiffsData[] = [
                'demandante_nombre_completo' => $plaintiff->merged_name,
                'demandante_corregimiento' => $plaintiff->jurisdiction->name,
                'demandante_distrito' => $plaintiff->jurisdiction->district->name,
                'demandante_provincia' => $plaintiff->jurisdiction->district->province->name,
                'demandante_direccion' => $plaintiff->address,
                'demandante_ficha' => 'Something',
                'demandante_imagen' => 'Something',
                'demandante_rollo' => 'Something',
                'demandante_telefono' => $plaintiff->phone_number,
            ];
        }

        return $plaintiffsData;
    }

    private function getRepresentativeData(Partner $representative): array
    {
        return [
            'APODERADO_NOMBRE_COMPLETO' => $representative->merged_name,
            'APODERADO_NUMERO_ID' => $representative->id_number,
            'APODERADO_TIPO_ID' => $representative->id_type,
            'apoderado_asiento' => 'Something',
            'apoderado_circuito' => 'Something',
            'apoderado_corregimiento' => $representative->jurisdiction->name,
            'apoderado_distrito' => $representative->jurisdiction->district->name,
            'apoderado_provincia' => $representative->jurisdiction->district->province->name,
            'apoderado_direccion' => $representative->address,
            'apoderado_entrada' => 'Something',
            'apoderado_escritura' => 'Something',
            'apoderado_escritura_fecha' => 'Something',
            'apoderado_estado_civil' => $representative->civil_status,
            'apoderado_ficha' => 'Something',
            'apoderado_genero' => $representative->is_male ? 'Masculino' : 'Femenino',
            'apoderado_nacionalidad' => $representative->country->nationality,
            'apoderado_notaria' => 'Something',
            'apoderado_numero_id' => $representative->id_number,
            'apoderado_tipo_id' => $representative->id_type,
            'apoderado_ocupacion' => $representative->occupation,
        ];
    }

    public function createDocument(Project $project)
    {
        $i = 'docassemble.playground3:acta_sociedad_fiadora_preguntas.yml';
        $key = env('DOCASSEMBLE_KEY');

        $credentials = Http::docassemble()
            ->withQueryParameters([
                'i' => $i,
                'key' => $key,
            ])->get('/session/new')
            ->json();

        $session = $credentials['session'];
        $secret = $credentials['secret'];

        $defendants = $project->getDefendants();
        $plaintiffs = $project->getPlaintiffs();

        // $representative = Partner::findOrFail($plaintiff->pivot->owner_id);
        $defendantsData = $this->getDefendantsData($defendants);
        $plaintiffsData = $this->getPlaintiffsData($plaintiffs);
        dd($plaintiffsData);

        $variables = [
            'NOMBRE_PROCESO' => $project->process->name,
            'proceso_monto' => '111',
            'proceso_monto_escrito' => 'Ciento once',
            'CIRCUITO_MUNICIPAL' => 'Something',
        ];

        dd($variables);

        $interview = Http::docassemble()
            ->post('/session',
                [
                    'i' => $i,
                    'key' => $key,
                    'session' => $session,
                    'secret' => $secret,
                    'variables' => $variables,
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
