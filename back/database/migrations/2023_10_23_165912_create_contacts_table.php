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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();

            $table->foreignId('staff_id')->constrained();
            $table->foreignId('user_id')->constrained();

            $table->boolean('active');
            $table->boolean('contract_emails');
            $table->boolean('credit_note_emails');
            $table->string('direction');
            $table->string('email');
            $table->string('email_verification_key');
            $table->dateTime('email_verification_sent_at');
            $table->dateTime('email_verified_at');
            $table->string('first_name');
            $table->boolean('invoice_emails');
            $table->integer('is_primary');
            $table->string('last_ip');
            $table->dateTime('last_login');
            $table->dateTime('last_password_change');
            $table->string('last_name');
            $table->string('new_pass_key');
            $table->dateTime('new_pass_key_requested');
            $table->string('password');
            $table->string('phone_number');
            $table->string('profile_image');
            $table->boolean('project_emails');
            $table->boolean('task_emails');
            $table->boolean('ticket_emails');
            $table->string('title');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
