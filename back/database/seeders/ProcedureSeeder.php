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
            ['id' => 1, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 1, 'responsible_id' => null, 'name' => 'Poder para el proceso hipotecario de bien inmueble'],
            ['id' => 2, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 2, 'responsible_id' => null, 'name' => 'Creación de la demanda para el proceso hipotecario de bien inmueble'],
            ['id' => 3, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 3, 'responsible_id' => null, 'name' => 'Admisión de la demanda'],
            ['id' => 4, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 4, 'responsible_id' => null, 'name' => 'Notificación de la demanda'],
            ['id' => 5, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 5, 'responsible_id' => null, 'name' => 'Solicitud de fecha de remate'],
            ['id' => 6, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 6, 'responsible_id' => null, 'name' => 'Fecha de remate'],
            ['id' => 7, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 7, 'responsible_id' => null, 'name' => 'Remate'],
            ['id' => 8, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 8, 'responsible_id' => null, 'name' => 'Inscripción en registro público'],
            ['id' => 9, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 9, 'responsible_id' => null, 'name' => 'Adjudicación al cliente'],
        ];

        foreach ($procedures as $procedure) {
            Procedure::updateOrCreate(['id' => $procedure['id']], $procedure);
        }
    }
}
