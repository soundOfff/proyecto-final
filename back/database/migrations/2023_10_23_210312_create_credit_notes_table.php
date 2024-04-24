<?php

use Carbon\Carbon;
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
            $table->foreignId('partner_id')->constrained();
            $table->foreignId('currency_id')->nullable()->constrained();
            $table->foreignId('credit_note_status_id')->nullable()->constrained();
            $table->foreignId('project_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('discount_type_id')->nullable()->constrained();
            $table->foreignId('billing_country_id')->nullable()->constrained('countries');
            $table->foreignId('shipping_country_id')->nullable()->constrained('countries');

            $table->integer('number')->nullable();
            $table->string('prefix', 50)->nullable();
            $table->integer('number_format')->default(0);
            $table->date('date')->default(Carbon::now());
            $table->text('admin_note')->nullable();
            $table->text('client_note')->nullable();
            $table->decimal('subtotal', 15, 2)->nullable();
            $table->decimal('total_tax', 15, 2)->default(0.00);
            $table->decimal('total', 15, 2)->nullable();
            $table->decimal('adjustment', 15, 2)->nullable();
            $table->integer('added_from')->nullable();
            $table->decimal('discount_percent', 15, 2)->default(0.00);
            $table->decimal('discount_total', 15, 2)->default(0.00);
            $table->string('deleted_customer_name', 100)->nullable();
            $table->string('reference_no', 100)->nullable();
            $table->string('billing_street', 200)->nullable();
            $table->string('billing_city', 100)->nullable();
            $table->string('billing_state', 100)->nullable();
            $table->string('billing_zip', 100)->nullable();
            $table->string('shipping_street', 200)->nullable();
            $table->string('shipping_city', 100)->nullable();
            $table->string('shipping_state', 100)->nullable();
            $table->string('shipping_zip', 100)->nullable();
            $table->boolean('include_shipping')->nullable();
            $table->boolean('show_shipping_on_credit_note')->default(true);
            $table->integer('show_quantity_as')->default(true);
            $table->text('terms')->nullable();

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
