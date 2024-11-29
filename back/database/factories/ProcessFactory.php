<?php

namespace Database\Factories;

use App\Models\Procedure;
use App\Models\Process;
use App\Models\ProjectServiceType;
use App\Models\Staff;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProcessFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->text(),
            'project_service_type_id' => ProjectServiceType::all()->random()->id,
            'author_id' => Staff::all()->random()->id,
        ];
    }

    /**
     * Configure the factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterCreating(function (Process $process) {
            Procedure::factory()
                ->for($process)
                ->count(5)
                ->sequence(
                    fn (Sequence $sequence) => ['step_number' => $sequence->index + 1]
                )
                ->create();
        });
    }
}
