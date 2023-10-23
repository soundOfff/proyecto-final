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
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_id')->constrained();

            $table->integer('active');
            $table->integer('added_from');
            $table->string('address');
            $table->string('billing_city');
            $table->integer('billing_country');
            $table->string('billing_state');
            $table->string('billing_street');
            $table->string('billing_zip');
            $table->string('city');
            $table->string('company');
            $table->boolean('consolidator')->default(false);
            $table->integer('consolidator_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partners');
    }
};
