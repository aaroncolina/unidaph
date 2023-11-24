<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    protected $lookupTables = [
        ChurchSeeder::class,
        RoleSeeder::class,
        TagSeeder::class,
    ];

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            ...$this->lookupTables,
            UserSeeder::class,
        ]);
    }
}
