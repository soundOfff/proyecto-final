<?php

namespace Database\Factories;

use App\Models\ItemGroup;
use App\Models\Tax;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'item_group_id' => ItemGroup::all()->random()->id,
            'description' => $this->faker->sentence,
            'long_description' => $this->faker->paragraph,
            'rate' => $this->faker->randomFloat(2, 0, 1000),
            'tax_id' => Tax::all()->random()->id,
            'tax2_id' => Tax::all()->random()->id,
        ];
    }
}
