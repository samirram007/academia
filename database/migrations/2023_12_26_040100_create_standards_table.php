<?php

use App\Models\Book;
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
        Schema::create('standards', function (Blueprint $table) {
            $table->id();
            $table->string('name')->require();
            $table->string('code')->nullable();
            $table->text('description');
            $table->timestamps();
        });
        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            $table->string('name')->require();
            $table->string('code')->nullable();
            $table->timestamps();
        });
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('name')->require();
            $table->string('code')->nullable();
            $table->text('description');

            $table->timestamps();
        });
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('name')->require();
            $table->string('code')->nullable();
            $table->text('description');
            $table->foreignId('standard_id')->constrained();
            $table->foreignId('subject_id')->constrained();
            $table->year('publication_year')->nullable();
            $table->integer('page_count')->default(10);
            $table->float('price', 8, 2)->unsigned()->default(0.00);
            $table->timestamp('published_at')->nullable();
            $table->string('publisher')->nullable();
            $table->string('author')->nullable();
            $table->string('illustrator')->nullable();
            $table->string('translator')->nullable();

            $table->timestamps();
        });
        Schema::create('book_modules', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Book::class);
            $table->string('name');
            $table->text('description')->nullable();
            $table->unique(['book_id','name']);
        });
        Schema::create('book_chapters', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Book::class);
            $table->string('name');
            $table->text('description')->nullable();
            $table->unique(['book_id','name']);

        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('standards');
        Schema::dropIfExists('sections');
        Schema::dropIfExists('subjects');
        Schema::dropIfExists('books');

    }
};
