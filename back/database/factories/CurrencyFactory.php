<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Currency>
 */
class CurrencyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'symbol' => $this->faker->randomElement(['$', '€', '£', '¥']),
            'name' => $this->faker->randomElement(['USD', 'EUR', 'GBP', 'JPY']),
            'decimal_separator' => $this->faker->randomElement(['.', ',']),
            'thousand_separator' => $this->faker->randomElement([',', '.']),
            'placement' => $this->faker->randomElement(['before', 'after']),
            'is_default' => $this->faker->boolean(10), // 10% chance to be the default currency
        ];
    }
}
