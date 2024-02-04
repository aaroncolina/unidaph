<?php

namespace Database\Seeders;

use App\Enums\RoleType;
use App\Models\Church;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    protected $users = [
        [
            'first_name' => 'Aaron',
            'last_name' => 'Colina',
            'username' => 'superadmin',
            'email' => 'aaron.colina@gmail.com',
            'church' => 'Noveleta',
            'role' => RoleType::MODERATOR,
        ],
        [
            'first_name' => 'Zedina',
            'last_name' => 'Colina',
            'email' => 'zedycolina@gmail.com',
            'church' => 'Noveleta',
            'role' => RoleType::MODERATOR,
        ],
        [
            'first_name' => 'Aleksandra',
            'last_name' => 'Padua',
            'email' => 'aleksandrapadua@gmail.com',
            'church' => 'Noveleta',
            'role' => RoleType::MODERATOR,
        ],
        [
            'first_name' => 'Arthur',
            'last_name' => 'Paredes',
            'email' => 'arthurparedes@gmail.com',
            'church' => 'Noveleta',
            'role' => RoleType::MODERATOR,
        ],
        [
            'first_name' => 'Ayi',
            'last_name' => 'Hernandez',
            'email' => 'ayihernandez@gmail.com',
            'church' => 'Noveleta',
            'role' => RoleType::MODERATOR,
        ],
        [
            'first_name' => 'Richard',
            'last_name' => 'Buenaventura',
            'email' => 'richardbuenaventura@gmail.com',
            'church' => 'Noveleta',
            'role' => RoleType::MODERATOR,
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->users as $user) {
            $church = Church::where('name', $user['church'])->first();
            $role = Role::where('name', $user['role']->value)->first();

            User::factory(1)->create([
                'email' => $user['email'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'username' => $user['username'] ?? null,
                'church_id' => $church?->id,
                'role_id' => $role?->id,
            ]);
        }

        User::factory(15000)->create([
            'church_id' => 'Noveleta',
            'role_id' => RoleType::MODERATOR,
        ]);
    }
}
