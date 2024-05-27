<?php

namespace Database\Seeders;

use App\Models\Procedure;
use Illuminate\Database\Seeder;

class ProcedureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $procedures = [
            ['id' => 1, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 1, 'responsible_id' => null, 'name' => 'Creación, revisión y enviar el poder'],
            ['id' => 2, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 2, 'responsible_id' => null, 'name' => 'Firma del poder y subir el poder'],
            ['id' => 3, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 3, 'responsible_id' => null, 'name' => 'Pedir y subir el certificado de registro público mediante el formulario de solicitud CRP'],
            ['id' => 4, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 4, 'responsible_id' => null, 'name' => 'Solicitud digital del certificado de registro público (plataforma del registro público - servicios telemáticos)'],
            ['id' => 5, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 5, 'responsible_id' => null, 'name' => 'Carpeta Física'],
            ['id' => 6, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 6, 'responsible_id' => null, 'name' => 'Retiro del Poder y documentos'],
            ['id' => 7, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 7, 'responsible_id' => null, 'name' => 'Redactar demanda'],
            ['id' => 8, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 8, 'responsible_id' => null, 'name' => 'Revisión de documentación'],
            ['id' => 9, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 9, 'responsible_id' => null, 'name' => 'Registro único de entrada (RUE)'],
            ['id' => 10, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 10, 'responsible_id' => null, 'name' => 'Asignación de juzgado'],
            ['id' => 11, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 11, 'responsible_id' => null, 'name' => 'Admisión de la demanda'],
        ];

        foreach ($procedures as $procedure) {
            Procedure::updateOrCreate(['id' => $procedure['id']], $procedure);
        }
    }
}
