x<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('partners', function (Blueprint $table) {
            $table->string('id_type')->nullable();
            $table->string('id_number')->nullable();
            $table->string('occupation')->nullable();
            $table->string('civil_status')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('partners', function (Blueprint $table) {
            $table->dropColumn('id_type');
            $table->dropColumn('id_number');
            $table->dropColumn('civil_status');
            $table->dropColumn('occupation');
        });
    }
};
