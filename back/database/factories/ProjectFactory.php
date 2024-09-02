<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'added_from' => fake()->randomDigitNotZero(),
            'start_date' => fake()->date(),
            'date_finished' => fake()->date(),
            'deadline' => fake()->date(),
            'description' => fake()->text(),
            'estimated_hours' => fake()->randomFloat(max: 1000),
            'name' => fake()->text(125),
            'expedient' => fake()->numerify(),
            'progress' => fake()->randomDigit(0, 100),
            'progress_from_tasks' => fake()->randomDigit(0, 100),
            'cost' => fake()->randomFloat(nbMaxDecimals: 2, max: 100000),
            'rate_per_hour' => fake()->randomFloat(nbMaxDecimals: 2, max: 1000),
            'amount' => fake()->randomFloat(nbMaxDecimals: 2, max: 100000),
            'jury_number' => fake()->randomDigitNotZero(),
            'on_schedule' => fake()->boolean(),
        ];
    }
}
