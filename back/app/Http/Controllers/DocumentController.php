<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function generate()
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
            'guarantor_name'=> 'John Doe',
            'guarantor_section'=> 'North Wing',
            'guarantor_folio_number'=> 'XF-1342',
            'date_minutes'=> '2024-05-10T14:30:00Z',
            'guarantor_president_name_full'=> 'Alice Johnson',
            'guarantor_secretary_name_full'=> 'Bob Smith',
            'debtor_name'=> 'Emily White',
            'amount'=> '5000.23',
            'guarantor_legal_person_name_full'=> 'XYZ Corporation',
            'guarantor_legal_person_id_number'=> '9876543210',
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

        $url = Storage::drive('google')->url('acta_sociedad_fiadora.pdf');

        preg_match('/id=([^&]*)/', $url, $matches);

        $id = $matches[1] ?? null;

        $url = "https://drive.google.com/file/d/$id/view?usp=sharing";

        return response()->json(['url' => $url]);
    }
}
