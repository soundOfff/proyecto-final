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
            $table->foreignId('invoice_id')->constrained();
            $table->foreignId('project_id')->constrained();
            $table->foreignId('expense_category_id')->constrained();

            $table->integer('added_from');
            $table->decimal('amount');
            $table->integer('billable');
            $table->boolean('create_invoice_billable');
            $table->integer('currency');
            $table->integer('custom_recurring');
            $table->integer('cycles');
            $table->date('date');
            $table->dateTime('date_added');
            $table->string('expense_name');
            $table->date('last_recurring_date');
            $table->text('note');
            $table->integer('recurring');
            $table->integer('recurring_from');
            $table->string('recurring_type');
            $table->string('reference_no');
            $table->integer('repeat_every');
            $table->boolean('send_invoice_to_customer');
            $table->integer('tax');
            $table->integer('tax2');
            $table->integer('total_cycles');
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
