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

            $table->foreignId('staff_id')->nullable()->constrained();
            $table->foreignId('partner_id')->constrained();

            $table->boolean('active')->default(true);
            $table->boolean('contract_emails');
            $table->boolean('credit_note_emails');
            $table->string('direction')->nullable();
            $table->string('email');
            $table->string('email_verification_key')->nullable();
            $table->dateTime('email_verification_sent_at')->nullable();
            $table->dateTime('email_verified_at')->nullable();
            $table->boolean('estimate_emails');
            $table->string('first_name');
            $table->boolean('invoice_emails');
            $table->boolean('is_primary');
            $table->string('last_ip')->nullable();
            $table->dateTime('last_login')->nullable();
            $table->dateTime('last_password_change')->nullable();
            $table->string('last_name');
            $table->string('new_pass_key')->nullable();
            $table->dateTime('new_pass_key_requested')->nullable();
            $table->string('password')->nullable();
            $table->string('token')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('profile_image')->nullable();
            $table->boolean('project_emails');
            $table->boolean('task_emails');
            $table->boolean('ticket_emails');
            $table->string('title')->nullable();

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
