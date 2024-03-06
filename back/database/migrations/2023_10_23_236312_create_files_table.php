<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->nullable()->constrained();
            $table->foreignId('contact_id')->nullable()->constrained();
            $table->foreignId('staff_id')->nullable()->constrained();
            $table->unsignedBigInteger('fileable_id')->nullable();
            $table->string('fileable_type')->nullable();

            $table->string('url');
            $table->string('subject');
            $table->boolean('visible_to_customer');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
