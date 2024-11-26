<?php

namespace Database\Factories;

use App\Models\Currency;
use App\Models\EstimateStatus;
use App\Models\Partner;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Estimate>
 */
class EstimateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sent' => $this->faker->boolean(),
            'date_send' => $this->faker->dateTime(),
            'deleted_customer_name' => $this->faker->name(),
            'number' => $this->faker->randomNumber(),
            'prefix' => $this->faker->randomElement(['EST-', 'QTE-', 'INV-']),
            'number_format' => $this->faker->randomNumber(3),
            'hash' => $this->faker->word(),
            'created_at' => $this->faker->dateTime(),
            'date' => $this->faker->date(),
            'expiry_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'subtotal' => $this->faker->randomFloat(2, 100, 1000),
            'total_tax' => $this->faker->randomFloat(2, 10, 100),
            'total' => $this->faker->randomFloat(2, 200, 2000),
            'adjustment' => $this->faker->randomFloat(2, -50, 50),
            'added_from' => $this->faker->randomDigitNotNull(),
            'client_note' => $this->faker->text(),
            'admin_note' => $this->faker->text(),
            'discount_percent' => $this->faker->randomFloat(2, 0, 20),
            'discount_total' => $this->faker->randomFloat(2, 0, 200),
            'discount_type_id' => $this->faker->randomElement([1, 2]), // 1 = Percentage, 2 = Fixed
            'invoice_id' => null,
            'invoiced_date' => null,
            'terms' => $this->faker->paragraph(),
            'reference_no' => $this->faker->uuid(),
            'billing_street' => $this->faker->streetAddress(),
            'billing_city' => $this->faker->city(),
            'billing_state' => $this->faker->state(),
            'billing_zip' => $this->faker->postcode(),
            'billing_country_id' => $this->faker->randomDigitNotNull(),
            'shipping_street' => $this->faker->streetAddress(),
            'shipping_city' => $this->faker->city(),
            'shipping_state' => $this->faker->state(),
            'shipping_zip' => $this->faker->postcode(),
            'shipping_country_id' => $this->faker->randomDigitNotNull(),
            'include_shipping' => $this->faker->boolean(),
            'show_shipping_on_estimate' => $this->faker->boolean(),
            'pipeline_order' => $this->faker->randomDigitNotNull(),
            'is_expiry_notified' => $this->faker->boolean(),
            'acceptance_firstname' => $this->faker->firstName(),
            'acceptance_lastname' => $this->faker->lastName(),
            'acceptance_email' => $this->faker->email(),
            'acceptance_date' => $this->faker->dateTime(),
            'acceptance_ip' => $this->faker->ipv4(),
            'signature' => null,
            'cancel_overdue_reminders' => $this->faker->boolean(),
            'recurring_id' => null,
            'estimate_status_id' => EstimateStatus::all()->random()->id,
            'currency_id' => Currency::all()->random()->id,
            'project_id' => Project::all()->random()->id,
            'partner_id' => Partner::all()->random()->id,
        ];
    }
}
