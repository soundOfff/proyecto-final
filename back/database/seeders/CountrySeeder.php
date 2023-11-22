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
            ['id' => 68, 'name' => 'AFGANISTAN', 'nationality' => 'AFGANA'],
            ['id' => 69, 'name' => 'AFRICA CENTRAL', 'nationality' => 'AFRICANA'],
            ['id' => 70, 'name' => 'AFRICA DEL SUR', 'nationality' => 'AFRICANA'],
            ['id' => 71, 'name' => 'ALBANIA', 'nationality' => 'ALBANA', 'code' => 'AL'],
            ['id' => 72, 'name' => 'ANDORRA', 'nationality' => 'ANDORRANA', 'code' => 'AD'],
            ['id' => 73, 'name' => 'ANGOLA', 'nationality' => 'ANGOLANA', 'code' => 'AO'],
            ['id' => 74, 'name' => 'ANGUILLA', 'nationality' => 'ANGUILLANA'],
            ['id' => 75, 'name' => 'ANTIGUA', 'nationality' => 'ANTIGUANA'],
            ['id' => 76, 'name' => 'ANTILLAS HOLANDESAS', 'nationality' => 'ANTILLANA HOLANDESA', 'code' => 'AN'],
            ['id' => 77, 'name' => 'ARABIA SAUDITA', 'nationality' => 'ARABE SAUDI', 'code' => 'SA'],
            ['id' => 78, 'name' => 'ARGELIA', 'nationality' => 'ARGELINA', 'code' => 'DZ'],
            ['id' => 79, 'name' => 'ARMENIA', 'nationality' => 'ARMENIANA', 'code' => 'AM'],
            ['id' => 80, 'name' => 'ARUBA', 'nationality' => 'ARUBANA', 'code' => 'AW'],
            ['id' => 81, 'name' => 'AUSTRIA', 'nationality' => 'AUSTRIANA', 'code' => 'AT'],
            ['id' => 82, 'name' => 'AZERBAYAN', 'nationality' => 'AZERBAYANA'],
            ['id' => 83, 'name' => 'BAHAMAS', 'nationality' => 'BAHAMAS', 'code' => 'BS'],
            ['id' => 84, 'name' => 'BAHREIN', 'nationality' => 'BAHREINA'],
            ['id' => 85, 'name' => 'BANGLADESH', 'nationality' => 'BANGLADESHA', 'code' => 'BD'],
            ['id' => 86, 'name' => 'BENIN', 'nationality' => 'BENINA', 'code' => 'BJ'],
            ['id' => 87, 'name' => 'BERMUDAS', 'nationality' => 'BERMUDAS', 'code' => 'BM'],
            ['id' => 88, 'name' => 'BUTAN', 'nationality' => 'BUTANA'],
            ['id' => 89, 'name' => 'BIELORUSIA', 'nationality' => 'BIELORUSIA'],
            ['id' => 90, 'name' => 'BOSNIA-HERZEGOVINA', 'nationality' => 'BOSNIO'],
            ['id' => 64, 'name' => 'FINLANDIA', 'nationality' => 'FINLANDES', 'code' => 'FI'],
            ['id' => 65, 'name' => 'SUD AFRICA', 'nationality' => 'SUDAFRICANO'],
            ['id' => 62, 'name' => 'GRAN BRETANIA', 'nationality' => 'BRITANICO'],
            ['id' => 63, 'name' => 'PAKISTAN', 'nationality' => 'PAKISTANI'],
            ['id' => 1, 'name' => 'PANAMA', 'nationality' => 'PANAMEÑA', 'code' => 'PA'],
            ['id' => 2, 'name' => 'SALVADOR', 'nationality' => 'SALVADOREÑA'],
            ['id' => 3, 'name' => 'ESPAÑA', 'nationality' => 'ESPAÑOLA'],
            ['id' => 4, 'name' => 'PERU', 'nationality' => 'PERUANA', 'code' => 'PE'],
            ['id' => 5, 'name' => 'CHILE', 'nationality' => 'CHILENA', 'code' => 'CL'],
            ['id' => 6, 'name' => 'CUBA', 'nationality' => 'CUBANA', 'code' => 'CU'],
            ['id' => 7, 'name' => 'FRANCIA', 'nationality' => 'FRANCESA', 'code' => 'FR'],
            ['id' => 8, 'name' => 'MEXICO', 'nationality' => 'MEXICANA', 'code' => 'MX'],
            ['id' => 9, 'name' => 'NICARAGUA', 'nationality' => 'NICARAGUENSE'],
            ['id' => 10, 'name' => 'ARGENTINA', 'nationality' => 'ARGENTINA', 'code' => 'AR'],
            ['id' => 11, 'name' => 'COLOMBIA', 'nationality' => 'COLOMBIANA', 'code' => 'CO'],
            ['id' => 12, 'name' => 'CHINA', 'nationality' => 'CHINA', 'code' => 'CN'],
            ['id' => 13, 'name' => 'ESTADOS UNIDOS', 'nationality' => 'ESTADOUNIDENSE', 'code' => 'US'],
            ['id' => 14, 'name' => 'INDIA', 'nationality' => 'HINDU', 'code' => 'IN'],
            ['id' => 15, 'name' => 'ECUADOR', 'nationality' => 'ECUATORIANA', 'code' => 'EC'],
            ['id' => 16, 'name' => 'ALEMANIA', 'nationality' => 'ALEMANA', 'code' => 'DE'],
            ['id' => 17, 'name' => 'JAPON', 'nationality' => 'JAPONESA', 'code' => 'JP'],
            ['id' => 18, 'name' => 'COSTA RICA', 'nationality' => 'COSTARRICENSE', 'code' => 'CR'],
            ['id' => 19, 'name' => 'GUATEMALA', 'nationality' => 'GUATEMALTECA', 'code' => 'GT'],
            ['id' => 20, 'name' => 'JAMAICA', 'nationality' => 'JAMAIQUINA', 'code' => 'JM'],
            ['id' => 21, 'name' => 'PUERTO RICO', 'nationality' => 'PUERTORRIQUEÑA', 'code' => 'PR'],
            ['id' => 22, 'name' => 'INGLATERRA', 'nationality' => 'INGLESA'],
            ['id' => 23, 'name' => 'EGIPTO', 'nationality' => 'EGIPCIA', 'code' => 'EG'],
        ];

        foreach ($countries as $country) {
            Country::updateOrCreate(['id' => $country['id']], $country);
        }
    }
}
