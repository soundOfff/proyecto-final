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
        Schema::create('invoice_payment_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained();

            $table->decimal('amount');
            $table->date('date');
            $table->dateTime('date_recorded');
            $table->text('note');
            $table->string('payment_method');
            $table->string('payment_mode');
            $table->mediumText('transaction_id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_payment_records');
    }
};
