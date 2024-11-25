<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentMethod>
 */
class PaymentMethodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement([
                'ach', 'visa', 'mastercard', 'amex', 'cash', 'check', 'transfer', 'quantum', 'bac',
            ]),
            'label' => $this->faker->randomElement([
                'ACH', 'Visa', 'Mastercard', 'Amex', 'Efectivo', 'Cheque',
                'Transferencia Internacional', 'Cuanto', 'BAC Compraclick',
            ]),
            'description' => $this->faker->optional()->sentence(),
            'show_on_pdf' => $this->faker->boolean(),
            'invoices_only' => $this->faker->boolean(),
            'expenses_only' => $this->faker->boolean(),
            'selected_by_default' => $this->faker->boolean(10), // 10% chance to be selected by default
            'active' => $this->faker->boolean(90), // 90% chance to be active
        ];
    }
}
