<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsDemoSeeder extends Seeder
{
    /**
     * Create the initial roles and permissions.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
 




        // gets all permissions via Gate::before rule; see AuthServiceProvider

        // create demo users
        $user = \App\Models\User::factory()->create([
            'name' => 'Example Super-Admin User',
            'username' => 'Example Super-Admin User',
            'user_type' => 'superadmin',
            'email' => 'superadmin@example.com',
        ]);
       
        $user = \App\Models\User::factory()->create([
            'name' => 'Example Admin User',
            'username' => 'Example Admin User',
            'user_type' => 'admin',
            'email' => 'admin@example.com',
        ]);
       
        $user = \App\Models\User::factory()->create([
            'name' => 'Example User',
            'username' => 'Example User',
            'user_type' => 'teacher',
            'email' => 'test@example.com',
        ]);
        




    }
}
