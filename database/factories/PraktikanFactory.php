<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PraktikanFactory extends Factory
{
    protected $model = \App\Models\Praktikan::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id, // Ambil user_id secara acak
            'nama_praktikan' => $this->faker->name(),
            'npm' => $this->faker->unique()->numerify('##########'),
            'no_hp' => $this->faker->phoneNumber(),
        ];
    }
}