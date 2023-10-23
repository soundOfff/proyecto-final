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
        Schema::create('staffs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained();

            $table->integer('active');
            $table->integer('admin');
            $table->string('default_language');
            $table->string('direction');
            $table->string('email');
            $table->text('email_signature');
            $table->mediumText('facebook');
            $table->string('first_name');
            $table->decimal('hourly_rate');
            $table->boolean('is_not_staff');
            $table->mediumText('linkedin');
            $table->dateTime('last_activity');
            $table->string('last_ip');
            $table->dateTime('last_login');
            $table->string('last_name');
            $table->dateTime('last_password_change');
            $table->string('media_path_slug');
            $table->string('new_pass_key');
            $table->dateTime('new_pass_key_requested');
            $table->string('password');
            $table->string('phone_number');
            $table->string('profile_image');
            $table->string('skype');
            $table->string('two_factor_auth_code');
            $table->dateTime('two_factor_auth_code_requested');
            $table->boolean('two_factor_auth_enabled');

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
