<?php

namespace Database\Factories;

use App\Models\LineItemType;
use App\Models\Procedure;
use App\Models\Process;
use App\Models\ProjectServiceType;
use App\Models\Staff;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class LineItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'line_item_type_id' => LineItemType::all()->random()->id,
            'description' => fake()->text(),
            'long_description' => fake()->paragraph(),
            'quantity' => fake()->randomDigitNotNull(),
            'rate' => fake()->randomFloat(2, 10, 100),
            'discount' => fake()->randomFloat(2, 0, 10),
        ];
    }
}
