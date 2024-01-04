<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'username' => fake()->unique()->userName(fake()->name()),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
    public function  userName($value)
    {

        // Generate a 10-character username based on the user's name
        //allow only alphabet
        $value = preg_replace('/[^a-zA-Z0-9]+/', '', $value);
        $baseUsername = strtolower(substr(str_replace(' ', '', $value), 0, 6));


            // If the username exists, append a random number to make it unique
            do {
                // Generate a random number
                $randomNumber = str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
                // Append the random number to the base username
                $username = $baseUsername . $randomNumber;
                // Check if the newly generated username exists
                $count = User::where('username', $username)->count();
            } while ($count > 0); // Loop until a unique username is found

        return $username;
    }
}
