<?php

namespace Database\Factories;

use App\Models\Currency;
use App\Models\InvoiceStatus;
use App\Models\Partner;
use App\Models\Project;
use App\Models\ProposalStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProposalFactory extends Factory
{
    public function definition()
    {
        return [
            'date_send' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'open_till' => $this->faker->dateTimeBetween('now', '+1 month'),
            'date' => $this->faker->date(),
            'subtotal' => $this->faker->randomFloat(2, 100, 10000),
            'total_tax' => $this->faker->randomFloat(2, 10, 1000),
            'total' => $this->faker->randomFloat(2, 200, 15000),
            'adjustment' => $this->faker->randomFloat(2, -500, 500),
            'added_from' => $this->faker->numberBetween(1, 50),
            'hash' => $this->faker->uuid(),
            'discount_percent' => $this->faker->numberBetween(0, 100),
            'discount_total' => $this->faker->randomFloat(2, 0, 500),
            'show_quantity_as' => '0',
            'currency_id' => Currency::all()->random()->id,
            'estimate_id' => EstimateFactory::new()->create()->id,
            'proposal_status_id' => ProposalStatus::all()->random()->id,
            'proposable_type' => 'customer',
            'proposable_id' => Partner::all()->random()->id,
            'allow_comments' => $this->faker->boolean(),
            'proposal_to' => $this->faker->name(),
            'subject' => $this->faker->word(),
        ];
    }
}
