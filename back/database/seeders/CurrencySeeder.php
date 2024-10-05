<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $currencies = [
            ['id' => 1, 'symbol' => '$', 'name' => 'USD', 'decimal_separator' => '.', 'thousand_separator' => ',', 'placement' => 'before', 'is_default' => '1'],
            ['id' => 2, 'symbol' => '€', 'name' => 'EUR', 'decimal_separator' => ',', 'thousand_separator' => '.', 'placement' => 'before', 'is_default' => '0'],
        ];

        foreach ($currencies as $currency) {
            Currency::updateOrCreate(['id' => $currency['id']], $currency);
        }
    }
}
