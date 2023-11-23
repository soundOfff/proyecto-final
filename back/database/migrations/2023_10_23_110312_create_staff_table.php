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
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained()->onUpdate('cascade');

            $table->string('email');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('password');
            $table->boolean('active')->default(true);
            $table->boolean('admin')->default(false);
            $table->decimal('hourly_rate')->default(0);
            $table->boolean('is_staff')->default(false);
            $table->boolean('two_factor_auth_enabled')->default(false);
            $table->string('default_language')->nullable();
            $table->string('direction')->nullable();
            $table->text('email_signature')->nullable();
            $table->mediumText('facebook')->nullable();
            $table->mediumText('linkedin')->nullable();
            $table->dateTime('last_activity')->nullable();
            $table->string('last_ip')->nullable();
            $table->dateTime('last_login')->nullable();
            $table->dateTime('last_password_change')->nullable();
            $table->string('media_path_slug')->nullable();
            $table->string('new_pass_key')->nullable();
            $table->dateTime('new_pass_key_requested')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('profile_image')->nullable();
            $table->string('skype')->nullable();
            $table->string('two_factor_auth_code')->nullable();
            $table->dateTime('two_factor_auth_code_requested')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staffs');
    }
};
