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
        Schema::table('reminders', function (Blueprint $table) {
            $table->dropColumn('creator');
        });

        Schema::table('reminders', function (Blueprint $table) {
            $table->foreignId('creator')->after('id')->nullable()->constrained('staff')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reminders', function (Blueprint $table) {
            $table->dropForeign(['creator']);
            $table->dropColumn('creator');
        });

        Schema::table('reminders', function (Blueprint $table) {
            $table->integer('creator')->nullable();
        });
    }
};
