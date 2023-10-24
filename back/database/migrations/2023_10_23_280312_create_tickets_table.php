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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contact_id')->constrained();
            $table->foreignId('department_id')->constrained();
            $table->foreignId('ticket_priority_id')->constrained();
            $table->foreignId('project_id')->constrained();
            $table->foreignId('user_id')->constrained();

            $table->integer('admin');
            $table->integer('admin_read');
            $table->integer('admin_replying');
            $table->integer('assigned');
            $table->integer('client_read');
            $table->dateTime('date');
            $table->text('email');
            $table->dateTime('last_reply');
            $table->text('message');
            $table->text('name');
            $table->integer('subject');
            $table->string('key');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
