<?php

namespace Database\Seeders;

use App\Enums\Feature;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    protected $roles = [

        'moderator' => [
            'type' => 'all',
            'description' => 'Overall moderator of the whole site',
            'features' => [],
        ],

        'national_admin' => [
            'type' => 'distinct',
            'description' => 'Role that has national level access',
            'features' => [
                ['key' => Feature::ACCESS, 'value' => true],
                ['key' => Feature::EDIT_OWN_PROFILE, 'value' => true],

                ['key' => Feature::GENERATE_REPORTS, 'value' => true],

                ['key' => Feature::ADD_ROLE, 'value' => false],
                ['key' => Feature::EDIT_ROLE, 'value' => false],
                ['key' => Feature::EDIT_ROLE_FEATURE, 'value' => false],
                ['key' => Feature::DELETE_ROLE, 'value' => false],

                ['key' => Feature::VIEW_USER, 'value' => true],
                ['key' => Feature::ADD_USER, 'value' => true],
                ['key' => Feature::EDIT_USER, 'value' => true],
                ['key' => Feature::EDIT_USER_FEATURE, 'value' => false],
                ['key' => Feature::DELETE_USER, 'value' => false],

                ['key' => Feature::ADD_CHURCH, 'value' => true],
                ['key' => Feature::EDIT_CHURCH, 'value' => true],
                ['key' => Feature::DELETE_CHURCH, 'value' => true],

                ['key' => Feature::ACCESS_NATIONAL_RECORDS, 'value' => true],
                ['key' => Feature::ACCESS_DISTRICT_RECORDS, 'value' => true],
                ['key' => Feature::ACCESS_LOCAL_RECORDS, 'value' => true],
            ],
        ],

        'district_admin' => [
            'type' => 'distinct',
            'description' => 'Role that has district level access',
            'features' => [
                ['key' => Feature::ACCESS, 'value' => true],
                ['key' => Feature::EDIT_OWN_PROFILE, 'value' => true],

                ['key' => Feature::GENERATE_REPORTS, 'value' => true],

                ['key' => Feature::ADD_ROLE, 'value' => false],
                ['key' => Feature::EDIT_ROLE, 'value' => false],
                ['key' => Feature::EDIT_ROLE_FEATURE, 'value' => false],
                ['key' => Feature::DELETE_ROLE, 'value' => false],

                ['key' => Feature::VIEW_USER, 'value' => true],
                ['key' => Feature::ADD_USER, 'value' => false],
                ['key' => Feature::EDIT_USER, 'value' => false],
                ['key' => Feature::EDIT_USER_FEATURE, 'value' => false],
                ['key' => Feature::DELETE_USER, 'value' => false],

                ['key' => Feature::ADD_CHURCH, 'value' => false],
                ['key' => Feature::EDIT_CHURCH, 'value' => false],
                ['key' => Feature::DELETE_CHURCH, 'value' => false],

                ['key' => Feature::ACCESS_NATIONAL_RECORDS, 'value' => false],
                ['key' => Feature::ACCESS_DISTRICT_RECORDS, 'value' => true],
                ['key' => Feature::ACCESS_LOCAL_RECORDS, 'value' => true],
            ],
        ],

        'local_admin' => [
            'type' => 'distinct',
            'description' => 'Role that has local level access',
            'features' => [
                ['key' => Feature::ACCESS, 'value' => true],
                ['key' => Feature::EDIT_OWN_PROFILE, 'value' => true],

                ['key' => Feature::GENERATE_REPORTS, 'value' => true],

                ['key' => Feature::ADD_ROLE, 'value' => false],
                ['key' => Feature::EDIT_ROLE, 'value' => false],
                ['key' => Feature::EDIT_ROLE_FEATURE, 'value' => false],
                ['key' => Feature::DELETE_ROLE, 'value' => false],

                ['key' => Feature::VIEW_USER, 'value' => true],
                ['key' => Feature::ADD_USER, 'value' => false],
                ['key' => Feature::EDIT_USER, 'value' => false],
                ['key' => Feature::EDIT_USER_FEATURE, 'value' => false],
                ['key' => Feature::DELETE_USER, 'value' => false],

                ['key' => Feature::ADD_CHURCH, 'value' => false],
                ['key' => Feature::EDIT_CHURCH, 'value' => false],
                ['key' => Feature::DELETE_CHURCH, 'value' => false],

                ['key' => Feature::ACCESS_NATIONAL_RECORDS, 'value' => false],
                ['key' => Feature::ACCESS_DISTRICT_RECORDS, 'value' => false],
                ['key' => Feature::ACCESS_LOCAL_RECORDS, 'value' => true],
            ],
        ],
    ];

    public function run()
    {
        foreach ($this->roles as $role => $details) {
            $role = Role::factory()->create([
                'name' => $role,
                'description' => $details['description'],
            ]);

            if ($details['type'] === 'all') {
                foreach (array_column(Feature::cases(), 'value') as $key => $value) {
                    $details['features'][] = [
                        'key' => Feature::from($value),
                        'value' => true,
                    ];
                }

            }

            $role->setFeatures($details['features']);
        }
    }
}
