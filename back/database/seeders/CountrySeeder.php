<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $countries = [
            ['code' => 68, 'name' => 'AFGANISTAN', 'nationality' => 'AFGANA'],
            ['code' => 69, 'name' => 'AFRICA CENTRAL', 'nationality' => 'AFRICANA'],
            ['code' => 70, 'name' => 'AFRICA DEL SUR', 'nationality' => 'AFRICANA'],
            ['code' => 71, 'name' => 'ALBANIA', 'nationality' => 'ALBANA', 'short_name' => 'AL'],
            ['code' => 72, 'name' => 'ANDORRA', 'nationality' => 'ANDORRANA', 'short_name' => 'AD'],
            ['code' => 73, 'name' => 'ANGOLA', 'nationality' => 'ANGOLANA', 'short_name' => 'AO'],
            ['code' => 74, 'name' => 'ANGUILLA', 'nationality' => 'ANGUILLANA'],
            ['code' => 75, 'name' => 'ANTIGUA', 'nationality' => 'ANTIGUANA'],
            ['code' => 76, 'name' => 'ANTILLAS HOLANDESAS', 'nationality' => 'ANTILLANA HOLANDESA', 'short_name' => 'AN'],
            ['code' => 77, 'name' => 'ARABIA SAUDITA', 'nationality' => 'ARABE SAUDI', 'short_name' => 'SA'],
            ['code' => 78, 'name' => 'ARGELIA', 'nationality' => 'ARGELINA', 'short_name' => 'DZ'],
            ['code' => 79, 'name' => 'ARMENIA', 'nationality' => 'ARMENIANA', 'short_name' => 'AM'],
            ['code' => 80, 'name' => 'ARUBA', 'nationality' => 'ARUBANA', 'short_name' => 'AW'],
            ['code' => 81, 'name' => 'AUSTRIA', 'nationality' => 'AUSTRIANA', 'short_name' => 'AT'],
            ['code' => 82, 'name' => 'AZERBAYAN', 'nationality' => 'AZERBAYANA'],
            ['code' => 83, 'name' => 'BAHAMAS', 'nationality' => 'BAHAMAS', 'short_name' => 'BS'],
            ['code' => 84, 'name' => 'BAHREIN', 'nationality' => 'BAHREINA'],
            ['code' => 85, 'name' => 'BANGLADESH', 'nationality' => 'BANGLADESHA', 'short_name' => 'BD'],
            ['code' => 86, 'name' => 'BENIN', 'nationality' => 'BENINA', 'short_name' => 'BJ'],
            ['code' => 87, 'name' => 'BERMUDAS', 'nationality' => 'BERMUDAS', 'short_name' => 'BM'],
            ['code' => 88, 'name' => 'BUTAN', 'nationality' => 'BUTANA'],
            ['code' => 89, 'name' => 'BIELORUSIA', 'nationality' => 'BIELORUSIA'],
            ['code' => 90, 'name' => 'BOSNIA-HERZEGOVINA', 'nationality' => 'BOSNIO'],
            ['code' => 64, 'name' => 'FINLANDIA', 'nationality' => 'FINLANDES', 'short_name' => 'FI'],
            ['code' => 65, 'name' => 'SUD AFRICA', 'nationality' => 'SUDAFRICANO'],
            ['code' => 62, 'name' => 'GRAN BRETANIA', 'nationality' => 'BRITANICO'],
            ['code' => 63, 'name' => 'PAKISTAN', 'nationality' => 'PAKISTANI'],
            ['code' => 1, 'name' => 'PANAMA', 'nationality' => 'PANAMEÑA', 'short_name' => 'PA'],
            ['code' => 2, 'name' => 'SALVADOR', 'nationality' => 'SALVADOREÑA'],
            ['code' => 3, 'name' => 'ESPAÑA', 'nationality' => 'ESPAÑOLA'],
            ['code' => 4, 'name' => 'PERU', 'nationality' => 'PERUANA', 'short_name' => 'PE'],
            ['code' => 5, 'name' => 'CHILE', 'nationality' => 'CHILENA', 'short_name' => 'CL'],
            ['code' => 6, 'name' => 'CUBA', 'nationality' => 'CUBANA', 'short_name' => 'CU'],
            ['code' => 7, 'name' => 'FRANCIA', 'nationality' => 'FRANCESA', 'short_name' => 'FR'],
            ['code' => 8, 'name' => 'MEXICO', 'nationality' => 'MEXICANA', 'short_name' => 'MX'],
            ['code' => 9, 'name' => 'NICARAGUA', 'nationality' => 'NICARAGUENSE'],
            ['code' => 10, 'name' => 'ARGENTINA', 'nationality' => 'ARGENTINA', 'short_name' => 'AR'],
            ['code' => 11, 'name' => 'COLOMBIA', 'nationality' => 'COLOMBIANA', 'short_name' => 'CO'],
            ['code' => 12, 'name' => 'CHINA', 'nationality' => 'CHINA', 'short_name' => 'CN'],
            ['code' => 13, 'name' => 'ESTADOS UNIDOS', 'nationality' => 'ESTADOUNIDENSE', 'short_name' => 'US'],
            ['code' => 14, 'name' => 'INDIA', 'nationality' => 'HINDU', 'short_name' => 'IN'],
            ['code' => 15, 'name' => 'ECUADOR', 'nationality' => 'ECUATORIANA', 'short_name' => 'EC'],
            ['code' => 16, 'name' => 'ALEMANIA', 'nationality' => 'ALEMANA', 'short_name' => 'DE'],
            ['code' => 17, 'name' => 'JAPON', 'nationality' => 'JAPONESA', 'short_name' => 'JP'],
            ['code' => 18, 'name' => 'COSTA RICA', 'nationality' => 'COSTARRICENSE', 'short_name' => 'CR'],
            ['code' => 19, 'name' => 'GUATEMALA', 'nationality' => 'GUATEMALTECA', 'short_name' => 'GT'],
            ['code' => 20, 'name' => 'JAMAICA', 'nationality' => 'JAMAIQUINA', 'short_name' => 'JM'],
            ['code' => 21, 'name' => 'PUERTO RICO', 'nationality' => 'PUERTORRIQUEÑA', 'short_name' => 'PR'],
            ['code' => 22, 'name' => 'INGLATERRA', 'nationality' => 'INGLESA'],
            ['code' => 23, 'name' => 'EGIPTO', 'nationality' => 'EGIPCIA', 'short_name' => 'EG'],
        ];

        foreach ($countries as $country) {
            Country::updateOrCreate(['code' => $country['code']], $country);
        }
    }
}
