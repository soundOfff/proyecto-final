<?php

namespace Database\Factories;

use App\Models\Partner;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ContactFactory extends Factory
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
            'contract_emails' => fake()->boolean(),
            'credit_note_emails' => fake()->boolean(),
            'direction' => fake()->address(),
            'email' => fake()->email(),
            'email_verification_key' => fake()->password(),
            'email_verification_sent_at' => fake()->dateTime(),
            'email_verified_at' => fake()->dateTime(),
            'first_name' => fake()->firstName(),
            'invoice_emails' => fake()->boolean(),
            'is_primary' => fake()->boolean(),
            'last_ip' => fake()->ipv4(),
            'last_login' => fake()->dateTime(),
            'last_password_change' => fake()->dateTime(),
            'last_name' => fake()->lastName(),
            'new_pass_key' => fake()->password(),
            'new_pass_key_requested' => fake()->dateTime(),
            'password' => fake()->password(),
            'phone_number' => fake()->phoneNumber(),
            'profile_image' => '/public/profile/images',
            'project_emails' => fake()->boolean(),
            'task_emails' => fake()->boolean(),
            'ticket_emails' => fake()->boolean(),
            'title' => fake()->title(),
        ];
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
                ['partner' => Partner::all()->random()]
            )
        );
    }
}
