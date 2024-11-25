<?php

namespace Database\Factories;

use App\Models\Court;
use App\Models\Partner;
use App\Models\PartnerProjectRole;
use App\Models\PartnerType;
use App\Models\Process;
use App\Models\Project;
use App\Models\ProjectBillingType;
use App\Models\ProjectNote;
use App\Models\ProjectServiceType;
use App\Models\ProjectStatus;
use App\Models\Staff;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

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

    /**
     * Configure the factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterCreating(function (Project $project) {
            $defendant = Partner::factory()->create();
            $owner = Partner::factory()->create();
            $plaintiff = Partner::factory()
                ->hasAttached($owner, ['partner_type_id' => PartnerType::OWNER])
                ->create();
            $guarantor = Partner::factory()->create();

            $project->partners()->attach($defendant, ['role_id' => PartnerProjectRole::DEFENDANT]);
            $project->partners()->attach($plaintiff, [
                'role_id' => PartnerProjectRole::PLAINTIFF,
                'owner_id' => $owner->id,
            ]);
            $project->partners()->attach($guarantor, ['role_id' => PartnerProjectRole::GUARANTOR]);

            $project->members()->attach(Staff::all()->random(3));

            $project->tags()->attach(Tag::all()->random(3));

            $project->notes()->saveMany(ProjectNote::factory()->count(3)->make());
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
                    'status' => ProjectStatus::all()->random(),
                    'billingType' => ProjectBillingType::all()->random(),
                    'billablePartner' => Partner::all()->random(),
                    'serviceType' => ProjectServiceType::all()->random(),
                    'process' => Process::all()->random(),
                    'court' => Court::all()->random(),
                ]
            )
        );
    }
}
