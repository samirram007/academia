<?php

namespace Database\Seeders;

use App\Enums\UserTypeEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class UserSeeder extends Seeder
{
    /**
     * Create the initial roles and permissions.
     *
     * @return void
     */
    public function run()
    {

        // create demo users
        $user = \App\Models\User::factory()->create([
            'name' => 'Super-Admin User',
            'user_type' => UserTypeEnum::SUPER_ADMIN,
            'email' => 'superadmin@example.com',
        ]);

        $user = \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'user_type' => UserTypeEnum::ADMIN,
            'email' => 'admin@example.com',
        ]);
        $user = \App\Models\User::factory()->create([
            'name' => 'User User',
            'user_type' => UserTypeEnum::TEACHER,
            'email' => 'test@example.com',
        ]);
        $user = \App\Models\Teacher::factory()->create([
            'user_id'=>3,
            'name' => 'Teacher1',
        ]);




    }
}
