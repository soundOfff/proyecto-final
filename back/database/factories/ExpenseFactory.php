<?php

namespace Database\Factories;

use App\Models\Currency;
use App\Models\ExpenseCategory;
use App\Models\Partner;
use App\Models\PaymentMethod;
use App\Models\Project;
use App\Models\Tax;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

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
            'amount' => $this->faker->randomFloat(2, 10, 1000),
            'reference_no' => $this->faker->uuid(),
            'note' => $this->faker->text(),
            'name' => $this->faker->word(),
            'billable' => $this->faker->boolean(),
            'date' => $this->faker->date(),
            'last_recurring_date' => $this->faker->optional()->date(),
            'create_invoice_billable' => $this->faker->boolean(),
            'send_invoice_to_customer' => $this->faker->boolean(),
            'recurring_from' => null,
            'date_added' => $this->faker->dateTime(),
            'added_from' => $this->faker->randomDigitNotNull(),
            'invoice_id' => null,
        ];
    }

    /**
     * Define random relations
     *
     * @return $this
     */
    public function withRandomRelations()
    {
        return $this->state(
            new Sequence(
                fn () => [
                    'expense_category_id' => ExpenseCategory::all()->random(),
                    'currency_id' => Currency::all()->random(),
                    'tax_id' => Tax::all()->push(null)->random(),
                    'tax2_id' => Tax::all()->push(null)->random(),
                    'payment_method_id' => PaymentMethod::all()->random(),
                    'partner_id' => Partner::all()->random(),
                    'project_id' => Project::all()->random(),
                ]
            )
        );
    }
}
