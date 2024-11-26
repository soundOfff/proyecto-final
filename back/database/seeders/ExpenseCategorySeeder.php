<?php

namespace Database\Seeders;

use App\Models\ExpenseCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpenseCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['id' => 1, 'name' => 'Notaria', 'description' => null],
            ['id' => 3, 'name' => 'Mensajeria', 'description' => null],
            ['id' => 4, 'name' => 'Registro Público', 'description' => null],
            ['id' => 5, 'name' => 'Gasto Bancario', 'description' => null],
            ['id' => 6, 'name' => 'TASA ÚNICA', 'description' => null],
            ['id' => 7, 'name' => 'Pagos a Terceros', 'description' => null],
            ['id' => 8, 'name' => 'Courier', 'description' => null],
            ['id' => 9, 'name' => 'GASTOS MIGRACIÓN', 'description' => null],
            ['id' => 10, 'name' => 'GASTOS ADMINISTRATIVOS', 'description' => 'GASTOS VARIOS INCURRIDOS EN EL TRÁMITE'],
            ['id' => 11, 'name' => 'TIMBRES', 'description' => 'FRANQUEO'],
            ['id' => 12, 'name' => 'Gastos Plan Básico Veló Emprende ¡Empieza tu negocio!', 'description' => null],
            ['id' => 13, 'name' => 'Gastos Plan Premium Veló Emprende ¡Empieza tu negocio!', 'description' => '1. Gastos por cierre de escritura pública<br /> 2.'],
            ['id' => 14, 'name' => 'Gastos Plan Básico E-Commerce Veló Emprende', 'description' => '1. Gastos por cierre de escritura pública<br /> 2.'],
            ['id' => 15, 'name' => 'Gastos Plan Premium E-Commerce Veló Emprende', 'description' => '1. Gastos por cierre de escritura pública<br /> 2.'],
            ['id' => 16, 'name' => 'Certificación de Placa Vehícular en ATTT', 'description' => 'Estas Certificaciones son utilizadas para Presenta...'],
        ];

        foreach ($categories as $cat) {
            ExpenseCategory::updateOrCreate(['id' => $cat['id']], $cat);
        }
    }
}
