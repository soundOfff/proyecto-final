<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $paymentMethods = [
            ['id' => 1, 'name' => 'ach', 'label' => 'ACH'],
            ['id' => 2, 'name' => 'visa', 'label' => 'Visa'],
            ['id' => 3, 'name' => 'mastercard', 'label' => 'Mastercard'],
            ['id' => 4, 'name' => 'amex', 'label' => 'Amex'],
            ['id' => 5, 'name' => 'cash', 'label' => 'Efectivo'],
            ['id' => 6, 'name' => 'check', 'label' => 'Cheque'],
            ['id' => 7, 'name' => 'transfer', 'label' => 'Transferencia Internacional'],
            ['id' => 8, 'name' => 'quantum', 'label' => 'Cuanto'],
            ['id' => 9, 'name' => 'bac', 'label' => 'BAC Compraclick'],
            ['id' => 10, 'name' => 'stripe', 'label' => 'Stripe Checkout'],
        ];

        foreach ($paymentMethods as $paymentMethod) {
            PaymentMethod::updateOrCreate(['id' => $paymentMethod['id']], $paymentMethod);
        }
    }
}
