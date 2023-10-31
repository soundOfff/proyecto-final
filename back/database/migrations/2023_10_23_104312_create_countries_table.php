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
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('calling_code')->nullable();
            $table->string('cctld')->nullable();
            $table->string('iso2')->nullable();
            $table->char('iso3')->nullable();
            $table->string('long_name');
            $table->string('num_code')->nullable();
            $table->string('short_name')->nullable();
            $table->string('un_member')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};
