<?php

namespace Database\Seeders;

use App\Enums\TagType;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    protected $lookups = [
        [
            'type' => TagType::TALENT,
            'data' => [
                'Technology' => [
                    'Programming',
                    'Networking',
                    'Server Management',
                ],
            ],
        ], [
            'type' => TagType::CHURCH_MINISTRY,
            'data' => [
                'Praise & Worship' => [
                    'Praise & Worship',
                    'Drummer',
                    'Keyboardist',
                    'Bassist',
                    'Guitarist',
                    'Vocalist',
                    'Back-up Singer',
                ],
                'Choir' => [
                    'Choir',
                ],
                'Multimedia' => [
                    'Multimedia',
                    'Camera Operator',
                    'Livestream Operator',
                    'Monitor Operator',
                ],
                'Small Group' => [
                    'Small Group Leader',
                    'Small Group Member',
                ],
                'Program' => [
                    'Program',
                ],
                'Creatives' => [
                    'Creatives',
                ],
                'Creatives' => [
                    'Creatives',
                ],
            ],
        ],
        [
            'type' => TagType::CHURCH_POSITION,
            'data' => [
                'Local' => [
                    'Administrative Pastor',
                    'Associate Pastor',
                    'Predicador',
                    'Elder',
                    'Deacon',
                    'Secretary',
                    'Auditor',
                    'Treasurer',
                    'Christian Education',
                    'Pastoral Care',
                    'Choir Officer',
                    'Kalalakihan Officer',
                    'Kababaihan Officer',
                    'Sunday School Officer',
                    'Young Adult Officer',
                    'Youth Officer',
                    'Kid\'s Care Officer',
                ],
                'District' => [
                    'District Superintendent',
                    'District Kalalakihan Officer',
                    'District Kababaihan Officer',
                    'District Youth Officer',
                    'District Sunday School Officer',
                    'District Choir Officer',
                    'District Secretary',
                    'District Auditor',
                    'District Treasurer',
                ],
                'National' => [
                    'General Superintendent',
                    'General Secretary',
                    'General Treasurer',
                    'General Evangelist',
                    'National Kalalakihan Officer',
                    'National Kababaihan Officer',
                    'National Youth Officer',
                    'National Sunday School Officer',
                    'National Choir Officer',
                    'National Deacon',
                    'SAPASUN Officer',
                    'CAPASUN Officer',
                ],
            ],
        ],
    ];

    public function run()
    {

        foreach ($this->lookups as $lookupDetails) {

            foreach ($lookupDetails['data'] as $category => $values) {

                foreach ($values as $value) {

                    Tag::factory()->create([
                        'type' => $lookupDetails['type'],
                        'value' => $value,
                        'category' => $category,
                        'description' => null,
                    ]);
                }
            }
        }
    }
}
