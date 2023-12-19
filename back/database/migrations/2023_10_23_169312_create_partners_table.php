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
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_id')->constrained();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->foreignId('consolidator_id')->nullable()->constrained('partners');

            $table->integer('lead_id')->nullable();
            $table->boolean('active')->default(true);
            $table->boolean('added_from')->default(false);
            $table->string('address')->nullable();
            $table->string('billing_city')->nullable();
            $table->integer('billing_country')->nullable();
            $table->string('billing_state')->nullable();
            $table->string('billing_street')->nullable();
            $table->string('billing_zip')->nullable();
            $table->string('city')->nullable();
            $table->string('company')->nullable();
            $table->boolean('is_consolidator')->default(false);
            $table->boolean('default_currency')->default(false);
            $table->string('default_language')->nullable();
            $table->integer('dv')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('phone_number')->nullable();
            $table->boolean('registration_confirmed')->default(true);
            $table->integer('shipping_country')->nullable();
            $table->string('shipping_city')->nullable();
            $table->string('shipping_state')->nullable();
            $table->string('shipping_street')->nullable();
            $table->string('shipping_zip')->nullable();
            $table->boolean('show_primary_contact')->default(false);
            $table->string('state')->nullable();
            $table->string('stripe_id')->nullable();
            $table->string('vat')->nullable();
            $table->string('website')->nullable();
            $table->string('zip')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partners');
    }
};
