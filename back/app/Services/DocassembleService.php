<?php

namespace App\Services;

use App\Models\File;
use App\Models\Partner;
use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use NumberToWords\NumberToWords;

class DocassembleService
{
    public function __construct(protected FileService $fileService)
    {
    }

    private array $defaultMessages = [
        'country_id.required' => 'El campo país es obligatorio',
        'country_id.exists' => 'El país seleccionado no es válido',
        'jurisdiction_id.required' => 'El campo jurisdicción es obligatorio',
        'jurisdiction_id.exists' => 'La jurisdicción seleccionada no es válida',
        'address.required' => 'El campo dirección es obligatorio',
        'id_type.required' => 'El campo tipo de identificación es obligatorio',
        'id_number.required' => 'El campo número de identificación es obligatorio',
        'phone_number.required' => 'El campo número de teléfono es obligatorio',
        'file_number.required' => 'El campo número de archivo es obligatorio',
        'image_number.required' => 'El campo número de imagen es obligatorio',
        'roll_number.required' => 'El campo número de rol es obligatorio',
        'civil_status.required' => 'El campo estado civil es obligatorio',
        'occupation.required' => 'El campo ocupación es obligatorio',
        'check_in.required' => 'El campo fecha de ingreso es obligatorio',
        'deed.required' => 'El campo escritura es obligatorio',
        'notary.required' => 'El campo notario es obligatorio',
        'deed_date.required' => 'El campo fecha de escritura es obligatorio',
        'seat.required' => 'El campo asiento es obligatorio',
        'legal_circuit.required' => 'El campo circuito legal es obligatorio',
        'sheet.required' => 'El campo folio es obligatorio',
    ];

    private function generateMessages($from)
    {
        return array_map(function ($message) use ($from) {
            return $message." para el $from.";
        }, $this->defaultMessages);
    }

    private function validate(Model $model, array $rules, string $from)
    {
        $messages = $this->generateMessages($from);

        $attributes = $model->getAttributes();
        if (isset($model->pivot)) {
            $attributes = array_merge($model->getAttributes(), $model->pivot->getAttributes());
        }

        $validator = Validator::make($attributes, $rules, $messages);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    public function createDocument(Project $project)
    {
        $defendant = $project->getDefendants()->first();
        $plaintiff = $project->getPlaintiffs()->first();
        abort_if(! $plaintiff->pivot, 404, 'Apoderado no encontrado');
        $representative = $plaintiff->relatedPartners()->find($plaintiff->pivot->owner_id);
        abort_if(! $representative, 404, 'Apoderado no encontrado');

        $this->validate($defendant, Partner::DEFENDANT_DOCUMENT_RULES, 'demandado');
        $this->validate($plaintiff, Partner::PLAINTIFF_DOCUMENT_RULES, 'demandante');
        $this->validate($representative, Partner::REPRESENTATIVE_DOCUMENT_RULES, 'apoderado');

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

        $filename = "poder_projecto_$project->id.pdf";
        $tempPath = tempnam(sys_get_temp_dir(), $filename);
        file_put_contents($tempPath, $file->body());

        Storage::disk('google')->put($filename, file_get_contents($tempPath));
        $ext = Storage::disk('google')->path("$filename");

        $publicUrl = $this->fileService->getPublicUrl($ext);

        File::create([
            'fileable_type' => 'project',
            'fileable_id' => $project->id,
            'subject' => $filename,
            'url' => $ext,
        ]);

        return $publicUrl;
    }
}
