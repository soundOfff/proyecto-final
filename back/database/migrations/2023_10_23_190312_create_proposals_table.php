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
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->nullable()->constrained();
            $table->foreignId('estimate_id')->nullable()->constrained();
            $table->foreignId('currency_id')->constrained();
            $table->foreignId('country_id')->nullable()->constrained();
            $table->foreignId('proposal_status_id')->constrained();
            $table->foreignId('discount_type_id')->nullable()->constrained();
            $table->foreignId('staff_assigned')->nullable()->constrained('staff');
            $table->morphs('proposable');

            $table->dateTime('acceptance_date')->nullable();
            $table->string('acceptance_email')->nullable();
            $table->string('acceptance_first_name')->nullable();
            $table->string('acceptance_last_name')->nullable();
            $table->string('acceptance_ip')->nullable();
            $table->integer('added_from');
            $table->string('address')->nullable();
            $table->decimal('adjustment')->nullable();
            $table->boolean('allow_comments');
            $table->string('city')->nullable();
            $table->longText('content')->nullable();
            $table->date('date');
            $table->dateTime('date_converted')->nullable();
            $table->date('date_send')->nullable();
            $table->decimal('discount_percent');
            $table->decimal('discount_total');
            $table->string('email');
            $table->string('hash')->nullable();
            $table->integer('is_expiry_notified');
            $table->date('open_till')->nullable();
            $table->string('phone')->nullable();
            $table->integer('pipeline_order');
            $table->string('proposal_to');
            $table->integer('show_quantity_as');
            $table->string('signature')->nullable();
            $table->string('state')->nullable();
            $table->string('subject');
            $table->decimal('subtotal');
            $table->decimal('total');
            $table->decimal('total_tax');
            $table->string('zip')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};
