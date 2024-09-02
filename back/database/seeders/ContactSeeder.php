<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    private $utils;

    public function __construct(Utils $utils = null)
    {
        $this->utils = $utils;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $contacts = $this->utils->csvToArray(database_path('imports/contacts.csv'));

        foreach ($contacts as $contact) {
            Contact::updateOrCreate(['id' => $contact['id']], $contact);
        }
    }
}
