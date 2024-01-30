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
            $table->foreignId('project_id')->nullable()->constrained();
            $table->foreignId('partner_id')->nullable()->constrained();
            $table->foreignId('currency_id')->nullable()->constrained();
            $table->foreignId('shipping_country_id')->nullable()->constrained('countries');
            $table->foreignId('billing_country_id')->nullable()->constrained('countries');
            $table->foreignId('estimate_id')->nullable();

            $table->integer('added_from')->nullable();
            $table->decimal('adjustment');
            $table->text('admin_note')->nullable();
            $table->mediumText('allowed_payment_modes')->nullable();
            $table->string('billing_city')->nullable();
            $table->string('billing_state')->nullable();
            $table->string('billing_street')->nullable();
            $table->string('billing_zip')->nullable();
            $table->integer('cancel_overdue_reminders')->nullable();
            $table->text('client_note')->nullable();
            $table->boolean('custom_recurring')->nullable()->default(false);
            $table->integer('cycles')->default(0);
            $table->date('date')->default(now());
            $table->dateTime('date_send')->nullable();
            $table->dateTime('date_created')->nullable();
            $table->string('deleted_customer_name')->nullable();
            $table->decimal('discount_percent')->nullable();
            $table->decimal('discount_total');
            $table->string('discount_type')->nullable();
            $table->date('due_date')->nullable();
            $table->string('hash')->nullable();
            $table->boolean('include_shipping')->default(false);
            $table->integer('is_recurring_from')->nullable();
            $table->date('last_overdue_reminder')->nullable();
            $table->date('last_recurring_date')->nullable();
            $table->integer('number');
            $table->integer('number_format');
            $table->string('prefix')->nullable();
            $table->integer('recurring')->nullable();
            $table->string('recurring_type')->nullable();
            $table->integer('sale_agent')->nullable();
            $table->boolean('sent');
            $table->string('shipping_city')->nullable();
            $table->string('shipping_state')->nullable();
            $table->string('shipping_street')->nullable();
            $table->string('shipping_zip')->nullable();
            $table->integer('show_quantity_as');
            $table->boolean('show_shipping_on_invoice');
            $table->integer('status');
            $table->integer('subscription_id')->nullable();
            $table->decimal('subtotal');
            $table->text('terms')->nullable();
            $table->mediumText('token')->nullable();
            $table->decimal('total');
            $table->integer('total_cycles')->default(0);
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
