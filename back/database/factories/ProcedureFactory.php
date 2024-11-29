<?php

namespace Database\Factories;

use App\Models\Procedure;
use App\Models\ProcedureStatus;
use App\Models\Process;
use App\Models\ProjectServiceType;
use App\Models\Staff;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProcedureFactory extends Factory
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
            'responsible' => fake()->randomElement(['Cliente', 'Abogado', 'Juez', 'Secretario', 'Otros']),
            'step_number' => fake()->numberBetween(1, 10),
            'author_id' => Staff::all()->random()->id,
            'procedure_status_id' => ProcedureStatus::all()->random()->id,
        ];
    }

    /**
     * Configure the factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterCreating(function (Procedure $procedure) {
            $procedure->dependencies()->attach(
                Procedure::all()->isEmpty() ? [] : Procedure::all()->random()->id
            );
        });
    }
}
