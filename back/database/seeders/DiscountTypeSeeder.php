<?php

namespace Database\Seeders;

use App\Models\DiscountType;
use Illuminate\Database\Seeder;

class DiscountTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $discountTypes = [
            ['id' => 1, 'label' => 'Sin Descuento'],
            ['id' => 2, 'label' => 'Antes del impuesto'],
            ['id' => 3, 'label' => 'Después del impuesto'],
        ];

        foreach ($discountTypes as $discountType) {
            DiscountType::updateOrCreate(['id' => $discountType['id']], $discountType);
        }
    }
}
