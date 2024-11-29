<?php

namespace Database\Factories;

use App\Models\LineItemType;
use App\Models\Tax;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class LineItemTaxFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tax = Tax::all()->random();

        return [
            'line_item_taxable_id' => fake()->randomDigitNotNull(),
            'line_item_taxable_type' => LineItemType::class,
            'name' => $tax->name,
            'rate' => $tax->rate,
        ];
    }
}
