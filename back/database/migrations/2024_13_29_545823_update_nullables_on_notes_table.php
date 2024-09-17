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
        Schema::table('notes', function (Blueprint $table) {
            $table->integer('added_from')->nullable()->change();
            $table->dateTime('date_contacted')->nullable()->change();
            $table->dateTime('date_added')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notes', function (Blueprint $table) {
            $table->integer('added_from')->nullable(false)->change();
            $table->dateTime('date_contacted')->nullable(false)->change();
            $table->dateTime('date_added')->nullable(false)->change();
        });
    }
};
