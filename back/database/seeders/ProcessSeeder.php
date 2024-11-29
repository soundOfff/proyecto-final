<?php

namespace Database\Seeders;

use App\Models\ProcedurePath;
use App\Models\Process;
use App\Models\ProjectServiceType;
use App\Models\Staff;
use Database\Factories\ProcessFactory;
use Illuminate\Database\Seeder;

class ProcessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $process = [
            'id' => 1,
            'name' => 'Proceso de juntas',
            'description' => 'Proceso administrativo de juntas',
            'author_id' => Staff::all()->random()->id,
            'project_service_type_id' => ProjectServiceType::where('name', 'administrative')->first()->id,
        ];

        $createdProcess = Process::updateOrCreate(['id' => $process['id']], $process);

        $procedures = [
            [
                'id' => 1,
                'step_number' => 1,
                'name' => 'Presentacion de poder y demanda',
                'description' => 'Se presenta el poder y la demanda',
                'process_id' => $createdProcess->id,
            ],
            [
                'id' => 2,
                'step_number' => 2,
                'name' => 'Secreatria judicial verifica competencia',
                'description' => 'Se verifica la competencia bajo el articulo 1 de la ley 7 de 1995',
                'process_id' => $createdProcess->id,
            ],
            [
                'id' => 3,
                'step_number' => 3,
                'name' => 'Secreatria judicial verifica requisitos',
                'description' => 'Se verifica que se cumplan los requisitos',
                'process_id' => $createdProcess->id,
            ],
            [
                'id' => 4,
                'step_number' => 4,
                'name' => 'Admitir',
                'description' => '',
                'process_id' => $createdProcess->id,
                'is_conditional' => true,
            ],
            [
                'id' => 5,
                'step_number' => 5,
                'name' => 'Corregir demanda',
                'description' => 'Se corrige la demanda',
                'process_id' => $createdProcess->id,
            ],
            [
                'id' => 6,
                'step_number' => 6,
                'name' => 'Se admite y se fija fecha de audiencia',
                'description' => '',
                'process_id' => $createdProcess->id,
            ],
            [
                'id' => 7,
                'step_number' => 7,
                'name' => 'Se prosigue con la etapa de notificacion a las partes',
                'description' => '',
                'process_id' => $createdProcess->id,
            ],
            [
                'id' => 8,
                'step_number' => 8,
                'name' => 'Notificacion',
                'description' => '',
                'process_id' => $createdProcess->id,
                'is_conditional' => true,
            ],
            [
                'id' => 9,
                'step_number' => 9,
                'name' => 'Poder emplazatorio',
                'description' => 'Asignar defensor ausente',
                'process_id' => $createdProcess->id,
            ],
            [
                'id' => 10,
                'step_number' => 10,
                'name' => 'Se fija fecha de audiencia',
                'description' => '',
                'process_id' => $createdProcess->id,
            ],
            [
                'id' => 11,
                'step_number' => 11,
                'name' => 'Sorteo de expedientes',
                'description' => 'Sorteo de los representantes legales',
                'process_id' => $createdProcess->id,
            ],
            [
                'id' => 12,
                'step_number' => 12,
                'name' => 'Se dicta a las partes a concilliar',
                'description' => '',
                'process_id' => $createdProcess->id,
            ],
            [
                'id' => 13,
                'step_number' => 13,
                'name' => 'Conciliacion',
                'description' => '',
                'process_id' => $createdProcess->id,
                'is_conditional' => true,
            ],
            [
                'id' => 14,
                'step_number' => 14,
                'name' => 'Se levanta acta de diligencia de arreglo',
                'description' => '',
                'process_id' => $createdProcess->id,
            ],
            [
                'id' => 15,
                'step_number' => 15,
                'name' => 'Se concede la oportunidad a la parte demandada para contestar',
                'description' => '',
                'process_id' => $createdProcess->id,
            ],
        ];

        foreach ($procedures as $procedure) {
            $createdProcess->procedures()->updateOrCreate(
                ['id' => $procedure['id'] ?? null],
                $procedure
            );
        }

        $paths = [
            [
                'id' => 1,
                'from_procedure_id' => 1,
                'to_procedure_id' => 2,
            ],
            [
                'id' => 2,
                'from_procedure_id' => 2,
                'to_procedure_id' => 3,
            ],
            [
                'id' => 3,
                'from_procedure_id' => 3,
                'to_procedure_id' => 4,
            ],
            [
                'id' => 4,
                'from_procedure_id' => 4,
                'to_procedure_id' => 5,
            ],
            [
                'id' => 5,
                'from_procedure_id' => 4,
                'to_procedure_id' => 6,
            ],
            [
                'id' => 6,
                'from_procedure_id' => 6,
                'to_procedure_id' => 7,
            ],
            [
                'id' => 7,
                'from_procedure_id' => 7,
                'to_procedure_id' => 8,
            ],
            [
                'id' => 8,
                'from_procedure_id' => 8,
                'to_procedure_id' => 9,
            ],
            [
                'id' => 9,
                'from_procedure_id' => 8,
                'to_procedure_id' => 10,
            ],
            [
                'id' => 10,
                'from_procedure_id' => 10,
                'to_procedure_id' => 11,
            ],
            [
                'id' => 11,
                'from_procedure_id' => 11,
                'to_procedure_id' => 12,
            ],
            [
                'id' => 12,
                'from_procedure_id' => 12,
                'to_procedure_id' => 13,
            ],
            [
                'id' => 13,
                'from_procedure_id' => 13,
                'to_procedure_id' => 14,
            ],
            [
                'id' => 14,
                'from_procedure_id' => 13,
                'to_procedure_id' => 15,
            ],
            [
                'id' => 15,
                'from_procedure_id' => 5,
                'to_procedure_id' => 3,
            ],
            [
                'id' => 16,
                'from_procedure_id' => 9,
                'to_procedure_id' => 7,
            ],
        ];

        foreach ($paths as $path) {
            ProcedurePath::updateOrCreate(
                ['id' => $path['id']],
                $path
            );
        }
    }
}
