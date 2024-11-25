<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Partner;
use App\Models\PartnerIndustry;
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
            'country_id' => Country::PANAMA_ID,
            'active' => fake()->boolean(),
            'added_from'=> fake()->randomDigit(1, 5),
            'address'=> fake()->address(),
            'billing_city'=> fake()->city(),
            'billing_country_id'=> Country::PANAMA_ID,
            'billing_state'=> fake('en_US')->state(),
            'billing_street'=> fake()->streetName(),
            'billing_zip'=> fake()->countryCode(),
            'city'=> fake()->city(),
            'name' => fake()->name(),
            'default_currency' => fake()->randomDigit(),
            'default_language' => fake()->randomElement(['en', 'es']),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
            'phone_number' => fake()->phoneNumber(),
            'registration_confirmed' => fake()->randomDigit(),
            'shipping_city' => fake()->city(),
            'shipping_country_id' => Country::PANAMA_ID,
            'shipping_state' => fake('en_US')->state(),
            'shipping_street' => fake()->streetAddress(),
            'shipping_zip' => fake()->postcode(),
            'show_primary_contact' => fake()->boolean(),
            'stripe_id' => fake()->uuid(),
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
                'ruc' => fake()->uuid(),
                'dv' => fake()->numerify('dv-###'),
                'website' => fake()->domainName(),
                'document' => fake()->numerify('document-###'),
                'default_language' => fake()->randomElement(['en', 'es']),
                'is_residential' => fake()->boolean(),
                'file_number' => fake()->numerify('file-###'),
                'roll_number' => fake()->numerify('roll-###'),
                'image_number' => fake()->numerify('image-###'),
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
                'name' => fake()->name(),
                'number' => fake()->phoneNumber(),
                'birth_date' => fake()->date(),
                'expedition_date' => fake()->date(),
                'expiration_date' => fake()->date(),
                'is_male' => fake()->boolean(),
                'id_type' => fake()->randomElement(['Cédula', 'Pasaporte', 'Carnet de Residente', 'Desconocido']),
                'id_number' => fake()->uuid(),
                'civil_status' => fake()->randomElement([
                    'Soltero',
                    'Casado',
                    'Divorciado',
                    'Viudo',
                    'Soltera',
                    'Casada',
                    'Divorciada',
                    'Viuda',
                    'Desconocida',
                    'Desconocido',
                ]),
                'occupation' => fake()->randomElement([
                    'Abogado',
                    'Autónomo',
                    'Científico',
                    'Contador',
                    'Comerciante',
                    'Economista',
                    'Empresario',
                    'Empleado',
                    'Ingeniero',
                    'Médico',
                    'Político',
                    'Programador',
                    'Psicólogo',
                    'Profesor',
                    'Secretario',
                    'Transportista',
                    'Otro',
                    'Desconocido',
                ]),
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
            if ($partner->isJuridic()) {
                $relatedPartners = [
                    ['partner' => Partner::factory()->create(), 'type' => PartnerType::PRESIDENT],
                    ['partner' => Partner::factory()->create(), 'type' => PartnerType::DIRECTOR],
                    ['partner' => Partner::factory()->create(), 'type' => PartnerType::SECRETARY],
                    ['partner' => Partner::factory()->create(), 'type' => PartnerType::RESPONSIBLE],
                    ['partner' => Partner::factory()->create(), 'type' => PartnerType::OWNER],
                ];

                foreach ($relatedPartners as $relatedPartner) {
                    $partner->relatedPartners()->attach($relatedPartner['partner']->id, [
                        'partner_type_id' => $relatedPartner['type'],
                    ]);
                }
            } else {
                $partner->update([
                    'industry_id' => PartnerIndustry::all()->random()->id,
                ]);
            }
        });
    }
}
