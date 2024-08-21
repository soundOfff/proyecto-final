<?php

namespace Database\Seeders;

use App\Models\PartnerIndustry;
use Illuminate\Database\Seeder;

class PartnerIndustrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $industries = [
            ['id' => 1, 'label' => 'Banca y Finanzas', 'name' => 'banking_and_finance'],
            ['id' => 2, 'label' => 'Seguros', 'name' => 'insurance'],
            ['id' => 3, 'label' => 'Tecnología de la Información', 'name' => 'information_technology'],
            ['id' => 4, 'label' => 'Energía y Recursos Naturales', 'name' => 'energy_and_natural_resources'],
            ['id' => 5, 'label' => 'Salud y Biotecnología', 'name' => 'health_and_biotechnology'],
            ['id' => 6, 'label' => 'Bienes Raíces', 'name' => 'real_estate'],
            ['id' => 7, 'label' => 'Manufactura', 'name' => 'manufacturing'],
            ['id' => 8, 'label' => 'Transporte y Logística', 'name' => 'transportation_and_logistics'],
            ['id' => 9, 'label' => 'Telecomunicaciones', 'name' => 'telecommunications'],
            ['id' => 10, 'label' => 'Medios y Entretenimiento', 'name' => 'media_and_entertainment'],
            ['id' => 11, 'label' => 'Retail y Comercio Electrónico', 'name' => 'retail_and_e_commerce'],
            ['id' => 12, 'label' => 'Construcción', 'name' => 'construction'],
            ['id' => 13, 'label' => 'Aviación', 'name' => 'aviation'],
            ['id' => 14, 'label' => 'Agricultura y Agroindustria', 'name' => 'agriculture_and_agribusiness'],
            ['id' => 15, 'label' => 'Educación', 'name' => 'education'],
            ['id' => 16, 'label' => 'Automotriz', 'name' => 'automotive'],
            ['id' => 17, 'label' => 'Hospitalidad y Turismo', 'name' => 'hospitality_and_tourism'],
            ['id' => 18, 'label' => 'Consultoría y Servicios Profesionales', 'name' => 'consulting_and_professional_services'],
            ['id' => 19, 'label' => 'Alimentos y Bebidas', 'name' => 'food_and_beverage'],
            ['id' => 20, 'label' => 'Minería', 'name' => 'mining'],
            ['id' => 21, 'label' => 'Desconocido', 'name' => 'unknown'],
        ];

        foreach ($industries as $industry) {
            PartnerIndustry::updateOrCreate(['id' => $industry['id']], $industry);
        }
    }
}
