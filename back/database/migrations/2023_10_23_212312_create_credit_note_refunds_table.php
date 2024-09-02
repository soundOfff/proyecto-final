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
        Schema::create('credit_note_refunds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('credit_note_id')->constrained();
            $table->foreignId('staff_id')->constrained();

            $table->decimal('amount');
            $table->text('note');
            $table->string('payment_mode');
            $table->date('refunded_on');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_note_refunds');
    }
};
