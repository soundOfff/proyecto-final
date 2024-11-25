<?php

namespace Database\Factories;

use App\Models\Currency;
use App\Models\ExpenseCategory;
use App\Models\Partner;
use App\Models\PaymentMethod;
use App\Models\Project;
use App\Models\Tax;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'expense_category_id' => ExpenseCategory::factory(),
            'currency_id' => Currency::factory(),
            'amount' => $this->faker->randomFloat(2, 10, 1000),
            'tax_id' => Tax::factory(),
            'tax2_id' => Tax::factory(),
            'reference_no' => $this->faker->uuid(),
            'note' => $this->faker->text(),
            'name' => $this->faker->word(),
            'partner_id' => Partner::factory(),
            'project_id' => Project::factory(),
            'billable' => $this->faker->boolean(),
            'invoice_id' => null,
            'payment_method_id' => PaymentMethod::factory(),
            'date' => $this->faker->date(),
            'recurring_type' => $this->faker->randomElement(['daily', 'weekly', 'monthly', 'yearly']),
            'repeat_id' => $this->faker->randomDigitNotNull(),
            'recurring' => $this->faker->boolean(),
            'cycles' => $this->faker->randomDigit(),
            'total_cycles' => $this->faker->randomDigit(),
            'custom_recurring' => $this->faker->boolean(),
            'last_recurring_date' => $this->faker->optional()->date(),
            'create_invoice_billable' => $this->faker->boolean(),
            'send_invoice_to_customer' => $this->faker->boolean(),
            'recurring_from' => null,
            'date_added' => $this->faker->dateTime(),
            'added_from' => $this->faker->randomDigitNotNull(),
        ];
    }
}
