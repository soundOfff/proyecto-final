<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class DocassembleService
{
    public function __construct(protected FileService $fileService)
    {
    }

    public function createDocument()
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

        $variables = [
            'APODERADO_NOMBRE_COMPLETO' => 'Something',
            'APODERADO_NUMERO_ID' => 'Something',
            'APODERADO_TIPO_ID' => 'Something',
            'CIRCUITO_MUNICIPAL' => 'Something',
            'DEMANDANTE' => 'Something',
            'DEMANDANTE_NOMBRE_COMPLETO' => 'Something',
            'NOMBRE_PROCESO' => 'Something',
            'apoderado_asiento' => 'Something',
            'apoderado_circuito' => 'Something',
            'apoderado_corregimiento' => 'Something',
            'apoderado_direccion' => 'Something',
            'apoderado_distrito' => 'Something',
            'apoderado_entrada' => 'Something',
            'apoderado_escritura' => 'Something',
            'apoderado_escritura_fecha' => 'Something',
            'apoderado_estado_civil' => 'Something',
            'apoderado_ficha' => 'Something',
            'apoderado_genero' => 'Something',
            'apoderado_nacionalidad' => 'Something',
            'apoderado_notaria' => 'Something',
            'apoderado_numero_id' => 'Something',
            'apoderado_ocupacion' => 'Something',
            'apoderado_provincia' => 'Something',
            'apoderado_tipo_id' => 'Something',
            'demandado_corregimiento' => 'Something',
            'demandado_direccion' => 'Something',
            'demandado_distrito' => 'Something',
            'demandado_genero' => 'Something',
            'demandado_nacionalidad' => 'Something',
            'demandado_nombre_completo' => 'Something',
            'demandado_numero_id' => 'Something',
            'demandado_provincia' => 'Something',
            'demandado_tipo_id' => 'Something',
            'demandante_corregimiento' => 'Something',
            'demandante_direccion' => 'Something',
            'demandante_distrito' => 'Something',
            'demandante_ficha' => 'Something',
            'demandante_imagen' => 'Something',
            'demandante_provincia' => 'Something',
            'demandante_rollo' => 'Something',
            'demandante_telefono' => 'Something',
            'proceso_monto' => 'Something',
            'proceso_monto_escrito' => 'Something',
        ];

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
