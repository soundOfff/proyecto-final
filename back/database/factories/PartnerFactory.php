<?php

namespace Database\Factories;

use App\Models\Partner;
use App\Models\PartnerType;
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
            'name' => fake()->name(),
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

    /**
     * Define a state for a specific type of partner.
     *
     * @return $this
     */
    public function juridic()
    {
        return $this->state(function (array $attributes) {
            return [
                'company' => fake()->company(),
                'vat' => fake()->uuid(),
            ];
        });
    }

    /**
     * Define a state for a specific type of partner.
     *
     * @return $this
     */
    public function natural()
    {
        return $this->state(function (array $attributes) {
            return [

            ];
        });
    }

    /**
     * Configure the factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterCreating(function (Partner $partner) {

            if
            $partner->relatedPartners()
                ->attach(
                    Partner::factory()->create(), ['partner_type_id' => PartnerType::OWNER]
                );
        });
    }
}
