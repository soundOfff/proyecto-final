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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_id')->constrained();

            $table->string('email')->unique();
            $table->string('first_name');
            $table->integer('active');
            $table->integer('added_from');
            $table->string('address');
            $table->string('billing_city');
            $table->integer('billing_country');
            $table->string('billing_state');
            $table->string('billing_street');
            $table->string('billing_zip');
            $table->string('city');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
