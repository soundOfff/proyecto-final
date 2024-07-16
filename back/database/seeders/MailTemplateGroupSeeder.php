<?php

namespace Database\Seeders;

use App\Models\MailTemplateGroup;
use Illuminate\Database\Seeder;

class MailTemplateGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $groups = [
            ['id' => 1, 'name' => 'Tickets', 'slug' => 'tickets'],
            ['id' => 2, 'name' => 'Proformas', 'slug' => 'estimates'],
            ['id' => 3, 'name' => 'Contactos', 'slug' => 'contacts'],
            ['id' => 4, 'name' => 'Facturas', 'slug' => 'invoices'],
            ['id' => 5, 'name' => 'Nota de crédito', 'slug' => 'credit_notes'],
            ['id' => 6, 'name' => 'Tareas', 'slug' => 'tasks'],
            ['id' => 7, 'name' => 'Clientes', 'slug' => 'partners'],
            ['id' => 8, 'name' => 'Propuestas', 'slug' => 'proposals'],
            ['id' => 9, 'name' => 'Casos', 'slug' => 'projects'],
            ['id' => 10, 'name' => 'Miembros del equipo', 'slug' => 'staff'],
        ];

        foreach ($groups as $group) {
            MailTemplateGroup::updateOrCreate(['id' => $group['id']], $group);
        }
    }
}
