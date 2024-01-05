<?php

use App\Models\Address;
use App\Enums\GenderEnum;
use App\Models\Department;
use App\Enums\UserTypeEnum;
use App\Models\Designation;
use App\Enums\UserStatusEnum;
use App\Enums\GurdianTypeEnum;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username')->unique();
            $table->enum('user_type',  array_keys(UserTypeEnum::labels()))->default(UserTypeEnum::default());
            $table->string('email')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('contact_no')->unique()->nullable();
            $table->string('password');
            $table->enum('status',array_keys(UserStatusEnum::labels()))->default(UserStatusEnum::default());
            $table->rememberToken();
            $table->timestamps();
        });
        Schema::create('developers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('name');
            $table->timestamps();
        });
        Schema::create('super_admins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('name');
            $table->timestamps();
        });
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('name');
            $table->foreignIdFor(Address::class)->nullable();
            $table->foreignIdFor(Department::class)->nullable();
            $table->foreignIdFor(Designation::class)->nullable();
            $table->date('doj')->nullable();
            $table->date('dob')->nullable();
            $table->enum('gender',array_keys(GenderEnum::labels()))->nullable();
            $table->timestamps();
        });
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('name');
            $table->foreignIdFor(Address::class)->nullable();
            $table->date('dob')->nullable();
            $table->enum('gender',array_keys(GenderEnum::labels()))->nullable();
            $table->string('aadhaar_no')->nullable();
            $table->timestamps();
        });
        Schema::create('guardians', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->enum('gurdian_type',array_keys(GurdianTypeEnum::labels()));
            $table->string('name');
            $table->foreignIdFor(Address::class)->nullable();
            $table->enum('gender',array_keys(GenderEnum::labels()))->nullable();
            $table->date('dob')->nullable();
            $table->string('aadhaar_no')->nullable();
            $table->string('pan_no')->nullable();
            $table->timestamps();
        });
        Schema::create('guardian_student', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('guardian_id');
            $table->unsignedBigInteger('student_id');
            $table->timestamps();

            $table->foreign('guardian_id')->references('id')->on('guardians')->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
        });
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('name');
            $table->foreignIdFor(Address::class)->nullable();
            $table->foreignIdFor(Department::class)->nullable();
            $table->foreignIdFor(Designation::class)->nullable();
            $table->date('doj')->nullable();
            $table->date('dob')->nullable();
            $table->enum('gender',array_keys(GenderEnum::labels()))->nullable();
            $table->string('aadhaar_no')->nullable();
            $table->string('pan_no')->nullable();
            $table->timestamps();
        });
        Schema::create('transport_owners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('name');
            $table->foreignIdFor(Address::class)->nullable();
            $table->date('doj')->nullable();
            $table->date('dob')->nullable();
            $table->enum('gender',array_keys(GenderEnum::labels()))->nullable();
            $table->string('aadhaar_no')->nullable();
            $table->string('pan_no')->nullable();
            $table->timestamps();
        });
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('name');
            $table->foreignIdFor(Address::class)->nullable();
            $table->date('doj')->nullable();
            $table->date('dob')->nullable();
            $table->enum('gender',array_keys(GenderEnum::labels()))->nullable();
            $table->string('aadhaar_no')->nullable();
            $table->string('pan_no')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('super_admins');
        Schema::dropIfExists('developers');
        Schema::dropIfExists('admins');
        Schema::dropIfExists('students');
        Schema::dropIfExists('teachers');
        Schema::dropIfExists('transport_owners');
        Schema::dropIfExists('drivers');
    }
};

