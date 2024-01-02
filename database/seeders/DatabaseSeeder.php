<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
<<<<<<< HEAD
        // PermissionsDemoSeeder::seeder();

        $this->call(PermissionsDemoSeeder::class);
=======
        $this->call([
            UserSeeder::class,
        ]);
>>>>>>> 7102e2c79d3c956c3b3754df9430b985381f3a67
    }
}
