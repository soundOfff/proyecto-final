<?php

namespace Database\Factories;

use App\Models\Currency;
use App\Models\Estimate;
use App\Models\InvoiceStatus;
use App\Models\Partner;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
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
            'recurring_type' => $this->faker->optional()->randomElement(['daily', 'weekly', 'monthly', 'yearly']),
            'custom_recurring' => $this->faker->boolean(),
            'is_recurring_from' => $this->faker->optional()->numberBetween(1, 500),
            'last_recurring_date' => $this->faker->optional()->dateTimeBetween('-1 year', 'now'),
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
            'number_format' => '0',
            'show_quantity_as' => '0',
            'partner_id' => Partner::all()->random()->id,
            'currency_id' => Currency::all()->random()->id,
            'invoice_status_id' => InvoiceStatus::all()->random()->id,
            'project_id' => Project::all()->random()->id,
            'estimate_id' => EstimateFactory::new()->create()->id,
        ];
    }
}