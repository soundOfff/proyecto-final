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
            ['id' => 1, 'name' => 'Tickets', 'slug' => 'Ticket'],
            ['id' => 2, 'name' => 'Proformas', 'slug' => 'Estimate'],
            ['id' => 3, 'name' => 'Contactos', 'slug' => 'Contact'],
            ['id' => 4, 'name' => 'Facturas', 'slug' => 'Invoice'],
            ['id' => 5, 'name' => 'Nota de crédito', 'slug' => 'CreditNote'],
            ['id' => 6, 'name' => 'Tareas', 'slug' => 'Task'],
            ['id' => 7, 'name' => 'Clientes', 'slug' => 'Partner'],
            ['id' => 8, 'name' => 'Propuestas', 'slug' => 'Proposal'],
            ['id' => 9, 'name' => 'Casos', 'slug' => 'Project'],
            ['id' => 10, 'name' => 'Miembros del equipo', 'slug' => 'Staff'],
        ];

        foreach ($groups as $group) {
            MailTemplateGroup::updateOrCreate(['id' => $group['id']], $group);
        }
    }
}
