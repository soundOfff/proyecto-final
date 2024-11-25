<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\Staff;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class StaffFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'active' => fake()->boolean(),
            'default_language' => fake()->randomElement(['en', 'es']),
            'direction' => fake()->streetAddress(),
            'email' => fake()->email(),
            'email_signature' => fake()->password(),
            'facebook' => fake()->userName(),
            'first_name' => fake()->firstName(),
            'hourly_rate' => fake()->randomFloat(2, max: 100),
            'is_staff' => fake()->boolean(),
            'linkedin' => fake()->userName(),
            'last_activity' => fake()->dateTime(),
            'last_ip' => fake()->ipv4(),
            'last_login' => fake()->dateTime(),
            'last_name' => fake()->lastName(),
            'last_password_change' => fake()->dateTime(),
            'media_path_slug' => '/public/media-slug',
            'new_pass_key' => fake()->password(),
            'new_pass_key_requested' => fake()->dateTime(),
            'password' => bcrypt('1234'),
            'phone_number' => fake()->phoneNumber(),
            'profile_image' => '/public/profiles/images',
            'skype' => fake()->userName(),
        ];
    }

    /**
     * configure the factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterCreating(function (Staff $staff) {
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
                ['role' => Role::all()->random()]
            )
        );
    }
}
