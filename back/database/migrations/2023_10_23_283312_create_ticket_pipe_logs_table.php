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
        Schema::create('ticket_pipe_logs', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('email_to');
            $table->mediumText('message');
            $table->string('name');
            $table->string('status');
            $table->string('subject');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_pipe_logs');
    }
};
