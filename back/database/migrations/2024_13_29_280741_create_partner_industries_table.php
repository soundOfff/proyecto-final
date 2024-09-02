<?php

use Database\Seeders\PartnerIndustrySeeder;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('partner_industries', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->string('name');

            $table->timestamps();
        });

        Artisan::call('db:seed', [
            '--class' => PartnerIndustrySeeder::class,
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partner_industries');
    }
};
