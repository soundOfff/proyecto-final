<?php

namespace Database\Factories;

use App\Models\Procedure;
use App\Models\Process;
use App\Models\ProjectServiceType;
use App\Models\Staff;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Process\FakeProcessResult;

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
            'step_quantity' => fake()->randomDigitNotZero(),
            'name' => fake()->words(3, true),
            'description' => fake()->text(),
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
            $process->procedures()->createMany(
                Procedure::factory()
                    ->count($process->step_quantity)
                    ->make()
                    ->toArray()
            );
        });
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
                fn (Sequence $sequence) => [
                    'projectServiceType' => ProjectServiceType::all()->random(),
                    'author' => Staff::all()->random(),
                ]
            )
        );
    }
}
