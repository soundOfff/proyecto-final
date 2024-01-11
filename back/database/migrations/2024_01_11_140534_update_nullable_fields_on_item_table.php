<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->text('long_description')->nullable()->change();
            $table->integer('tax')->nullable()->change();
            $table->integer('tax2')->nullable()->change();
            $table->string('unit')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->text('long_description')->change();
            $table->integer('tax')->change();
            $table->integer('tax2')->change();
            $table->string('unit')->change();
        });
    }
};
