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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained();

            $table->integer('added_from');
            $table->decimal('adjustment');
            $table->text('admin_note');
            $table->mediumText('allowed_payment_modes');
            $table->string('billing_city');
            $table->integer('billing_country');
            $table->string('billing_state');
            $table->string('billing_street');
            $table->string('billing_zip');
            $table->integer('cancel_overdue_reminders');
            $table->integer('client_id');
            $table->text('client_note');
            $table->integer('currency');
            $table->boolean('custom_recurring');
            $table->integer('cycles');
            $table->date('date');
            $table->dateTime('date_send');
            $table->string('deleted_customer_name');
            $table->decimal('discount_percent');
            $table->decimal('discount_type');
            $table->date('due_date');
            $table->integer('estimate_id');
            $table->string('hash');
            $table->boolean('include_shipping');
            $table->integer('is_recurring_from');
            $table->date('last_overdue_reminder');
            $table->date('last_recurring_date');
            $table->integer('number');
            $table->integer('number_format');
            $table->string('prefix');
            $table->integer('recurring');
            $table->string('recurring_type');
            $table->integer('sale_agent');
            $table->boolean('sent');
            $table->string('shipping_city');
            $table->integer('shipping_country');
            $table->string('shipping_state');
            $table->string('shipping_street');
            $table->string('shipping_zip');
            $table->integer('show_quantity_as');
            $table->boolean('show_shipping_on_invoice');
            $table->integer('status');
            $table->integer('subscription_id');
            $table->decimal('subtotal');
            $table->text('terms');
            $table->mediumText('token');
            $table->decimal('total');
            $table->integer('total_cycles');
            $table->decimal('total_tax');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
