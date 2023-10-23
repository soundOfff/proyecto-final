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
            $table->foreignId('invoice_id')->constrained();
            $table->morphs('proposable');

            $table->dateTime('acceptance_date');
            $table->string('acceptance_email');
            $table->string('acceptance_first_name');
            $table->string('acceptance_last_name');
            $table->string('acceptance_ip');
            $table->integer('added_from');
            $table->string('address');
            $table->decimal('adjustment');
            $table->boolean('allow_comments');
            $table->integer('assigned');
            $table->string('city');
            $table->longText('content');
            $table->integer('country');
            $table->integer('currency');
            $table->date('date');
            $table->dateTime('date_converted');
            $table->date('date_send');
            $table->dateTime('date_created');
            $table->decimal('discount_percent');
            $table->decimal('discount_total');
            $table->string('discount_type');
            $table->string('email');
            $table->integer('estimate_id');
            $table->string('hash');
            $table->integer('is_expiry_notified');
            $table->date('open_till');
            $table->string('phone');
            $table->integer('pipeline_order');
            $table->string('proposal_to');
            $table->integer('show_quantity_as');
            $table->string('signature');
            $table->string('state');
            $table->decimal('subtotal');
            $table->decimal('total');
            $table->decimal('total_tax');
            $table->string('zip');
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
