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
            $table->foreignId('jurisdiction_id')->nullable()->constrained();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->foreignId('consolidator_id')->nullable()->constrained('partners');
            $table->foreignId('billing_country_id')->nullable()->constrained('countries');
            $table->foreignId('shipping_country_id')->nullable()->constrained('countries');
            $table->foreignId('president_id')->nullable()->constrained('partners');
            $table->foreignId('secretary_id')->nullable()->constrained('partners');
            $table->foreignId('treasurer_id')->nullable()->constrained('partners');
            $table->foreignId('nationality_id')->nullable()->constrained('countries');
            $table->foreignId('birth_place_id')->nullable()->constrained('countries');

            $table->string('name')->nullable();
            $table->string('number')->nullable();
            $table->date('birth_date')->nullable();
            $table->date('expedition_date')->nullable();
            $table->date('expiration_date')->nullable();
            $table->boolean('is_male')->nullable();

            $table->string('company')->nullable();
            $table->string('file_number')->nullable();
            $table->string('roll_number')->nullable();
            $table->string('image_number')->nullable();
            $table->integer('dv')->nullable();
            $table->string('ruc')->nullable();
            $table->string('website')->nullable();
            $table->string('zip')->nullable();
            $table->boolean('is_consolidator')->nullable();

            $table->string('state')->nullable();
            $table->string('city')->nullable();
            $table->string('address')->nullable();
            $table->string('phone_number')->nullable();
            $table->boolean('is_residential')->nullable();
            $table->string('building_number')->nullable();
            $table->string('email')->nullable();

            $table->string('billing_city')->nullable();
            $table->string('billing_state')->nullable();
            $table->string('billing_street')->nullable();
            $table->string('billing_zip')->nullable();
            $table->string('shipping_city')->nullable();
            $table->string('shipping_state')->nullable();
            $table->string('shipping_street')->nullable();
            $table->string('shipping_zip')->nullable();

            $table->integer('lead_id')->nullable();
            $table->boolean('active')->nullable();
            $table->boolean('added_from')->nullable();
            $table->boolean('default_currency')->nullable();
            $table->string('default_language')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('stripe_id')->nullable();
            $table->string('vat')->nullable();
            $table->boolean('show_primary_contact')->nullable();
            $table->boolean('registration_confirmed')->nullable();

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
