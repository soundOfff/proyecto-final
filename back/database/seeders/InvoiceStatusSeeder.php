<?php

namespace Database\Seeders;

use App\Models\InvoiceStatus;
use Illuminate\Database\Seeder;

class InvoiceStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            ['id' => 1, 'label' => 'Por Pagar'],
            ['id' => 2, 'label' => 'Pagada'],
            ['id' => 3, 'label' => 'Pagada Parcialmente'],
            ['id' => 4, 'label' => 'Retrasada'],
            ['id' => 5, 'label' => 'Canceladas'],
            ['id' => 6, 'label' => 'Borrador'],
            ['id' => 7, 'label' => 'Cancelada por NC'],
        ];

        foreach ($statuses as $status) {
            InvoiceStatus::updateOrCreate(['id' => $status['id']], $status);
        }
    }
}
