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
            ['id' => 1, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 1, 'name' => 'Poder para el proceso hipotecario de bien inmueble'],
            ['id' => 2, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 2, 'name' => 'Creación de la demanda para el proceso hipotecario de bien inmueble'],
            ['id' => 3, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 3, 'name' => 'Admisión de la demanda'],
            ['id' => 4, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 4, 'name' => 'Notificación de la demanda'],
            ['id' => 5, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 5, 'name' => 'Solicitud de fecha de remate'],
            ['id' => 6, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 6, 'name' => 'Fecha de remate'],
            ['id' => 7, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 7, 'name' => 'Remate'],
            ['id' => 8, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 8, 'name' => 'Inscripción en registro público'],
            ['id' => 9, 'process_id' => 1, 'procedure_status_id' => 1, 'step_number' => 9, 'name' => 'Adjudicación al cliente'],
        ];

        foreach ($procedures as $procedure) {
            Procedure::updateOrCreate(['id' => $procedure['id']], $procedure);
        }
    }
}
