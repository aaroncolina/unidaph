<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    public function definition()
    {
        return [
            'type' => fake()->name(),
            'value' => fake()->name(),
            'category' => fake()->text(),
            'description' => fake()->text(),
        ];
    }
}
