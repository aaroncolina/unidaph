<?php

namespace Database\Seeders;

use App\Enums\ChurchCategory;
use App\Models\Church;
use Illuminate\Database\Seeder;

class ChurchSeeder extends Seeder
{
    protected $churches = [

        'national' => [
            [
                'name' => 'National',
                'category' => ChurchCategory::NATIONAL,
            ],
        ],

        'district' => [
            [
                'name' => 'Cavite 1',
                'category' => ChurchCategory::DISTRICT,
            ], [
                'name' => 'Cavite 2',
                'category' => ChurchCategory::DISTRICT,
            ], [
                'name' => 'Cavite 3',
                'category' => ChurchCategory::DISTRICT,
            ], [
                'name' => 'Cavite 4',
                'category' => ChurchCategory::DISTRICT,
            ], [
                'name' => 'Laguna',
                'category' => ChurchCategory::DISTRICT,
            ], [
                'name' => 'Metro Manila 1',
                'category' => ChurchCategory::DISTRICT,
            ], [
                'name' => 'Metro Manila 2',
                'category' => ChurchCategory::DISTRICT,
            ], [
                'name' => 'Metro Manila 3',
                'category' => ChurchCategory::DISTRICT,
            ], [
                'name' => 'Bulacan',
                'category' => ChurchCategory::DISTRICT,
            ], [
                'name' => 'Visayas-Mindanao',
                'category' => ChurchCategory::DISTRICT,
            ],
        ],

        'local' => [
            [
                'name' => 'Noveleta',
                'category' => ChurchCategory::LOCAL,
                'parent' => 'Cavite 4',
            ], [
                'name' => 'Anabu',
                'category' => ChurchCategory::LOCAL,
                'parent' => 'Cavite 2',
            ], [
                'name' => 'Salawag',
                'category' => ChurchCategory::LOCAL,
                'parent' => 'Cavite 2',
            ], [
                'name' => 'Bacao',
                'category' => ChurchCategory::LOCAL,
                'parent' => 'Cavite 4',
            ], [
                'name' => 'Baclaran',
                'category' => ChurchCategory::LOCAL,
                'parent' => 'Metro Manila 1',
            ],
        ],
    ];

    public function run()
    {

        $nationalChurch = $this->create($this->churches['national'][0]);
        $districtChurches = collect();

        foreach ($this->churches['district'] as $attributes) {
            $districtChurches->push(
                $this->create([
                    ...$attributes,
                    'parent_id' => $nationalChurch->id,
                ])
            );
        }

        foreach ($this->churches['local'] as $attributes) {
            $parentChurch = $districtChurches->where('name', $attributes['parent'] ?? 0)->first();

            $this->create([
                ...$attributes,
                'parent_id' => $parentChurch->id ?? null,
            ]);
        }
    }

    public function create($attributes): Church
    {
        return Church::factory()->create([
            'name' => $attributes['name'],
            'category' => $attributes['category'],
            'description' => $attributes['description'] ?? null,
            'parent_id' => $attributes['parent_id'] ?? null,
        ]);
    }
}
