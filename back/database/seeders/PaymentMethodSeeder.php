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
            ['id' => 1, 'name' => 'ach', 'label' => 'ACH', 'show_on_pdf' => '0', 'invoices_only' => '0', 'expenses_only' => '0', 'selected_by_default' => '1', 'active' => '1'],
            ['id' => 2, 'name' => 'visa', 'label' => 'Visa', 'show_on_pdf' => '0', 'invoices_only' => '0', 'expenses_only' => '0', 'selected_by_default' => '0', 'active' => '1'],
            ['id' => 3, 'name' => 'mastercard', 'label' => 'Mastercard', 'show_on_pdf' => '0', 'invoices_only' => '0', 'expenses_only' => '0', 'selected_by_default' => '0', 'active' => '1'],
            ['id' => 8, 'name' => 'amex', 'label' => 'Amex', 'show_on_pdf' => '0', 'invoices_only' => '0', 'expenses_only' => '0', 'selected_by_default' => '0', 'active' => '1'],
            ['id' => 9, 'name' => 'cash', 'label' => 'Efectivo', 'show_on_pdf' => '0', 'invoices_only' => '0', 'expenses_only' => '0', 'selected_by_default' => '0', 'active' => '1'],
            ['id' => 10, 'name' => 'check', 'label' => 'Cheque', 'show_on_pdf' => '0', 'invoices_only' => '0', 'expenses_only' => '0', 'selected_by_default' => '0', 'active' => '1'],
            ['id' => 11, 'name' => 'transfer', 'label' => 'Transferencia Internacional', 'show_on_pdf' => '0', 'invoices_only' => '0', 'expenses_only' => '0', 'selected_by_default' => '0', 'active' => '1'],
            ['id' => 12, 'name' => 'quantum', 'description' => 'Plataforma de pago en linea', 'label' => 'Cuanto', 'show_on_pdf' => '0', 'invoices_only' => '0', 'expenses_only' => '0', 'selected_by_default' => '0', 'active' => '1'],
            ['id' => 13, 'name' => 'bac', 'label' => 'BAC Compraclick', 'show_on_pdf' => '0', 'invoices_only' => '0', 'expenses_only' => '0', 'selected_by_default' => '0', 'active' => '1'],
        ];

        foreach ($paymentMethods as $paymentMethod) {
            PaymentMethod::updateOrCreate(['id' => $paymentMethod['id']], $paymentMethod);
        }
    }
}
