<?php

namespace Database\Seeders;

use App\Models\ProjectStageType;
use Illuminate\Database\Seeder;

class ProjectStageTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $stageTypes = [
            ['id' => 1, 'name' => 'Por presentar'],
            ['id' => 2, 'name' => 'Demanda Presentada'],
            ['id' => 3, 'name' => 'Pendiente de Admisión'],
            ['id' => 4, 'name' => 'Demanda Admitida'],
            ['id' => 5, 'name' => 'Enviada a Notificación'],
            ['id' => 6, 'name' => 'Emplazamiento por Edicto'],
            ['id' => 7, 'name' => 'Demandado Notificado'],
            ['id' => 8, 'name' => 'Defensor de Ausente'],
            ['id' => 9, 'name' => 'Vencido Periodo de Excepciones'],
            ['id' => 10, 'name' => 'Embargo'],
            ['id' => 11, 'name' => 'Remate Solicitado'],
            ['id' => 12, 'name' => 'Remate Decretado'],
            ['id' => 13, 'name' => 'Publicaciones de Aviso de Remate'],
            ['id' => 14, 'name' => 'Remate Realizado'],
            ['id' => 15, 'name' => 'Adjudicación Provisional'],
            ['id' => 16, 'name' => 'Adjudicación Definitiva'],
            ['id' => 17, 'name' => 'Inscripción en Registro Público'],
            ['id' => 18, 'name' => 'Desistimiento'],
            ['id' => 19, 'name' => 'Suspendido'],
            ['id' => 20, 'name' => 'Finalizado'],
            ['id' => 21, 'name' => 'Impugnado'],
            ['id' => 22, 'name' => 'Presentan Excepción'],
            ['id' => 23, 'name' => 'Se solicita Retiro'],
            ['id' => 24, 'name' => 'Desglose Admitido'],
            ['id' => 25, 'name' => 'Certificación art 560'],
            ['id' => 26, 'name' => 'Presentar Aclaración de Demanda (error en finca)'],
            ['id' => 27, 'name' => 'Esperando respuesta de oficio aclarativo'],
            ['id' => 28, 'name' => 'Admisión de Pruebas'],
            ['id' => 29, 'name' => 'Pendiente designen defensor de ausente'],
            ['id' => 30, 'name' => 'Pendiente de Presentar Aclaración de Demanda (la demandada no se puede localizar para reconocimiento de firma y es proceso ejecutivo)'],
            ['id' => 31, 'name' => 'Defensor de Ausente Contesta Demanda'],
            ['id' => 32, 'name' => 'Aclaración de demanda'],
            ['id' => 33, 'name' => 'Resolviendo para emitir Sentencia'],
            ['id' => 34, 'name' => 'Esperando respuesta de oficio de embargo positiva'],
            ['id' => 35, 'name' => 'Solicita Desglose (demanda negada)'],
            ['id' => 36, 'name' => 'En espera que se reciba cheque por parte de Pandeportes'],
            ['id' => 37, 'name' => 'En espera del exhorto de inventario'],
            ['id' => 38, 'name' => 'Por presentar solicitud de aclaración'],
            ['id' => 39, 'name' => 'En espera del exhorto de inventario'],
            ['id' => 40, 'name' => 'Incidente de Resición de Secuestro'],
            ['id' => 41, 'name' => 'Transacción Judicial'],
            ['id' => 42, 'name' => 'Pendiente Matriz de Oficios'],
            ['id' => 43, 'name' => 'Pendiente de fijar caución (secuestro)'],
            ['id' => 44, 'name' => 'Se denuncia bienes'],
            ['id' => 45, 'name' => 'Pendiente decreten secuestro'],
            ['id' => 46, 'name' => 'Secuestro.- Presentado'],
            ['id' => 47, 'name' => 'Secuestro.- Fija caución'],
            ['id' => 48, 'name' => 'Secuestro.- Decreta embargo'],
        ];

        foreach ($stageTypes as $type) {
            ProjectStageType::updateOrCreate(['id' => $type['id']], $type);
        }
    }
}
