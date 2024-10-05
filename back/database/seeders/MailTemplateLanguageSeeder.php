<?php

namespace Database\Seeders;

use App\Models\MailTemplate;
use App\Models\MailTemplateLanguage;
use Illuminate\Database\Seeder;

class MailTemplateLanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languages = [
            ['id' => 1, 'code' => 'en', 'locale' => 'en-US', 'name' => 'English'],
            ['id' => 2, 'code' => 'es', 'locale' => 'es-ES', 'name' => 'Spanish'],
            ['id' => 3, 'code' => 'fr', 'locale' => 'fr-FR', 'name' => 'French'],
            ['id' => 4, 'code' => 'de', 'locale' => 'de-DE', 'name' => 'German'],
            ['id' => 5, 'code' => 'it', 'locale' => 'it-IT', 'name' => 'Italian'],
            ['id' => 6, 'code' => 'pt', 'locale' => 'pt-BR', 'name' => 'Portuguese']
        ];

        foreach ($languages as $language) {
            MailTemplateLanguage::updateOrCreate($language);
        }
    }
}
