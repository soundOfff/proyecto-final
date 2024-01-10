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
        Schema::create('estimates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partner_id')->nullable()->constrained();
            $table->foreignId('currency_id')->nullable()->constrained();
            $table->foreignId('project_id')->nullable()->constrained();
            $table->foreignId('invoice_id')->nullable()->constrained();
            $table->foreignId('billing_country_id')->nullable()->constrained('countries');
            $table->foreignId('shipping_country_id')->nullable()->constrained('countries');

            $table->boolean('sent')->default(0);
            $table->dateTime('date_send')->nullable();
            $table->string('deleted_customer_name', 100)->nullable();
            $table->integer('number')->nullable();
            $table->string('prefix', 50)->nullable();
            $table->integer('number_format')->default(0);
            $table->string('hash', 32)->nullable();
            $table->date('date');
            $table->date('expiry_date')->nullable();
            $table->decimal('subtotal', 15, 2)->nullable();
            $table->decimal('total_tax', 15, 2)->default(0.00);
            $table->decimal('total', 15, 2)->nullable();
            $table->decimal('adjustment', 15, 2)->nullable();
            $table->integer('added_from')->nullable();
            $table->integer('status')->default(1);
            $table->text('client_note')->nullable();
            $table->text('admin_note')->nullable();
            $table->decimal('discount_percent', 15, 2)->default(0.00);
            $table->decimal('discount_total', 15, 2)->default(0.00);
            $table->string('discount_type', 30)->nullable();
            $table->dateTime('invoiced_date')->nullable();
            $table->text('terms')->nullable();
            $table->string('reference_no', 100)->nullable();
            $table->integer('sale_agent')->default(0);
            $table->string('billing_street', 200)->nullable();
            $table->string('billing_city', 100)->nullable();
            $table->string('billing_state', 100)->nullable();
            $table->string('billing_zip', 100)->nullable();
            $table->string('shipping_street', 200)->nullable();
            $table->string('shipping_city', 100)->nullable();
            $table->string('shipping_state', 100)->nullable();
            $table->string('shipping_zip', 100)->nullable();
            $table->boolean('include_shipping')->nullable();
            $table->boolean('show_shipping_on_estimate')->default(1);
            $table->integer('show_quantity_as')->default(1);
            $table->integer('pipeline_order')->default(0);
            $table->integer('is_expiry_notified')->default(0);
            $table->string('acceptance_firstname', 50)->nullable();
            $table->string('acceptance_lastname', 50)->nullable();
            $table->string('acceptance_email', 100)->nullable();
            $table->dateTime('acceptance_date')->nullable();
            $table->string('acceptance_ip', 40)->nullable();
            $table->string('signature', 40)->nullable();
            $table->integer('cancel_overdue_reminders')->default(0);
            $table->integer('recurring')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estimates');
    }
};
