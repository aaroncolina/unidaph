<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ChurchFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'category' => fake()->name(),
            'description' => fake()->text(),
        ];
    }
}
