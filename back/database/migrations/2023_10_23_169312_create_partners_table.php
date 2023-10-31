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
            $table->foreignId('user_id')->constrained();

            $table->integer('lead_id')->nullable();
            $table->integer('active');
            $table->integer('added_from');
            $table->string('address');
            $table->string('billing_city');
            $table->integer('billing_country');
            $table->string('billing_state');
            $table->string('billing_street');
            $table->string('billing_zip');
            $table->string('city');
            $table->string('company');
            $table->boolean('consolidator')->default(false);
            $table->integer('consolidator_id')->nullable();
            $table->integer('default_currency');
            $table->string('default_language');
            $table->integer('dv');
            $table->string('latitude');
            $table->string('longitude');
            $table->string('phone_number');
            $table->integer('registration_confirmed');
            $table->string('shipping_city');
            $table->integer('shipping_country');
            $table->string('shipping_state');
            $table->string('shipping_street');
            $table->string('shipping_zip');
            $table->integer('show_primary_contact');
            $table->string('state');
            $table->string('stripe_id');
            $table->string('vat');
            $table->string('website');
            $table->string('zip');

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
