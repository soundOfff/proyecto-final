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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('payment_method_id')->constrained();
            $table->foreignId('partner_id')->constrained()->onDelete('cascade');
            $table->decimal('amount');
            $table->decimal('expenses_amount');
            $table->date('date');
            $table->dateTime('date_recorded')->nullable();
            $table->text('note')->nullable();
            $table->string('payment_mode')->nullable();
            $table->mediumText('transaction_id')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
