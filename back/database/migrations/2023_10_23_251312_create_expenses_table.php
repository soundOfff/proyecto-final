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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->nullable()->constrained();
            $table->foreignId('project_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('partner_id')->nullable()->constrained();
            $table->foreignId('expense_category_id')->constrained();
            $table->foreignId('currency_id')->constrained();
            $table->foreignId('tax_id')->nullable()->constrained();
            $table->foreignId('tax2_id')->nullable()->constrained('taxes');
            $table->foreignId('payment_method_id')->nullable()->constrained();
            $table->foreignId('repeat_id')->nullable()->constrained('expense_repeats');

            $table->integer('added_from')->default(0);
            $table->decimal('amount');
            $table->integer('billable');
            $table->boolean('create_invoice_billable')->default(false);
            $table->integer('custom_recurring')->nullable();
            $table->integer('cycles')->nullable();
            $table->date('date');
            $table->dateTime('date_added')->default(now());
            $table->string('name')->nullable();
            $table->date('last_recurring_date')->nullable();
            $table->text('note')->nullable();
            $table->integer('recurring')->nullable();
            $table->integer('recurring_from')->nullable();
            $table->string('recurring_type')->nullable();
            $table->boolean('is_infinite')->default(false);
            $table->string('reference_no')->nullable();
            $table->boolean('send_invoice_to_customer')->default(false);
            $table->integer('total_cycles')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
