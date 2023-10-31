<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class PartnerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'active' => fake()->boolean(),
            'added_from'=> fake()->randomDigit(1, 5),
            'address'=> fake()->address(),
            'billing_city'=> fake()->city(),
            'billing_country'=> fake()->randomDigit(1, 10),
            'billing_state'=> 'accepted',
            'billing_street'=> fake()->streetName(),
            'billing_zip'=> fake()->countryCode(),
            'city'=> fake()->city(),
            'company'=> fake()->name(),
            'default_currency' => fake()->randomDigit(),
            'default_language' => fake()->randomElement(['en', 'es']),
            'dv'=> fake()->randomDigit(),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
            'phone_number' => fake()->phoneNumber(),
            'registration_confirmed' => fake()->randomDigit(),
            'shipping_city' => fake()->city(),
            'shipping_country' => fake()->randomDigit(),
            'shipping_state' => fake()->randomElement(['accepted', 'rejected']),
            'shipping_street' => fake()->streetAddress(),
            'shipping_zip' => fake()->postcode(),
            'show_primary_contact' => fake()->boolean(),
            'state' => fake()->randomElement(['pending', 'accepted', 'deleted']),
            'stripe_id' => fake()->uuid(),
            'vat' => fake()->uuid(),
            'website' => fake()->domainName(),
            'zip' => fake()->postcode(),
        ];
    }
}
