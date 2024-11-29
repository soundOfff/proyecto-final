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
        Schema::dropIfExists('task_actions');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('task_actions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained()->onDelete('cascade');
            $table->foreignId('action_id')->unique()->constrained()->onDelete('cascade');
            $table->boolean('is_completed')->default(false);

            $table->timestamps();
        });
    }
};
