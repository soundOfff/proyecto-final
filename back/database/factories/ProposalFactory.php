<?php

namespace Database\Factories;

use App\Models\Currency;
use App\Models\Estimate;
use App\Models\InvoiceStatus;
use App\Models\Partner;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProposalFactory extends Factory
{
    protected $model = \App\Models\Invoice::class;

    public function definition()
    {
        return [
            'sent' => $this->faker->boolean(),
            'date_send' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'deleted_customer_name' => $this->faker->name(),
            'number' => $this->faker->unique()->numberBetween(1, 100000),
            'prefix' => $this->faker->word(),
            'number_format' => '0',
            'date_created' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'date' => $this->faker->date(),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'subtotal' => $this->faker->randomFloat(2, 100, 10000),
            'total_tax' => $this->faker->randomFloat(2, 10, 1000),
            'total' => $this->faker->randomFloat(2, 200, 15000),
            'adjustment' => $this->faker->randomFloat(2, -500, 500),
            'added_from' => $this->faker->numberBetween(1, 50),
            'hash' => $this->faker->uuid(),
            'client_note' => $this->faker->paragraph(),
            'admin_note' => $this->faker->sentence(),
            'last_overdue_reminder' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'cancel_overdue_reminders' => $this->faker->boolean(),
            'allowed_payment_modes' => json_encode($this->faker->randomElements(['credit_card', 'paypal', 'bank_transfer'], 2)),
            'token' => $this->faker->sha256(),
            'discount_percent' => $this->faker->numberBetween(0, 100),
            'discount_total' => $this->faker->randomFloat(2, 0, 500),
            'discount_type' => $this->faker->randomElement(['percentage', 'fixed']),
            'terms' => $this->faker->paragraph(),
            'billing_street' => $this->faker->streetAddress(),
            'billing_city' => $this->faker->city(),
            'billing_state' => $this->faker->state(),
            'billing_zip' => $this->faker->postcode(),
            'shipping_street' => $this->faker->optional()->streetAddress(),
            'shipping_city' => $this->faker->optional()->city(),
            'shipping_state' => $this->faker->optional()->state(),
            'shipping_zip' => $this->faker->optional()->postcode(),
            'include_shipping' => $this->faker->boolean(),
            'show_shipping_on_invoice' => $this->faker->boolean(),
            'show_quantity_as' => '0',
        ];
    }

    /**
     * Define random relations
     *
     * @return $this
     */
    public function withRandomRelations()
    {
        return $this->state(function () {
            return [
                'partner_id' => Partner::all()->random(),
                'currency_id' => Currency::all()->random(),
                'project_id' => Project::all()->random(),
                'estimate_id' => EstimateFactory::new()->create(), // needs to be unique
                'invoice_status_id' => InvoiceStatus::all()->random(),
                'shipping_country_id' => $this->faker->optional()->numberBetween(1, 200),
            ];
        });
    }
}
