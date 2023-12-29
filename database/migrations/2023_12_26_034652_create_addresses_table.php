<?php

use App\Enums\AddressTypeEnum;
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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('address_line_1');
            $table->string('address_line_2')->nullable();
            $table->string('city')->nullable();
            $table->foreignId(column:'state_id')
            ->constrained(table:'states')
            ->onDelete(action:'cascade');
            $table->foreignId(column:'country_id')
            ->constrained(table:'countries')
            ->onDelete(action:'cascade');
            $table->string('pincode')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->enum('address_type',AddressTypeEnum::labels())->default();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
