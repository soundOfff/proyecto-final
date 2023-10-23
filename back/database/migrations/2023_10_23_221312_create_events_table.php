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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();

            $table->string('color');
            $table->text('description');
            $table->dateTime('start');
            $table->dateTime('end');
            $table->boolean('is_start_notified');
            $table->integer('public');
            $table->integer('reminder_before');
            $table->string('reminder_before_type');
            $table->mediumText('title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
