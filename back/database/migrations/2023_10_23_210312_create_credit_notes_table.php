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
        Schema::create('credit_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained();
            $table->foreignId('staff_id')->constrained();

            $table->decimal('amount');
            $table->date('date');
            $table->dateTime('date_applied');
            $table->string('billing_city');
            $table->integer('billing_country');
            $table->string('billing_state');
            $table->string('billing_street');
            $table->string('billing_zip');
            $table->string('city');
            $table->string('company');
            $table->boolean('consolidator')->default(false);
            $table->integer('consolidator_id')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_notes');
    }
};
