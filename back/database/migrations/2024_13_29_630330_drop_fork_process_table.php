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
        Schema::dropIfExists('fork_process');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('fork_process', function (Blueprint $table) {
            $table->id();
            $table->foreignId('process_id')->constrained()->onDelete('cascade');
            $table->foreignId('fork_id')->constrained('processes')->onDelete('cascade');
            $table->timestamps();
        });
    }
};
