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
        Schema::table('procedures', function (Blueprint $table) {
            $table->dropForeign(['responsible_id']);
            $table->dropColumn('responsible_id');
            $table->string('responsible')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('procedures', function (Blueprint $table) {
            $table->foreignId('responsible_id')->nullable()->constrained('staff');
            $table->dropColumn('responsible');
        });
    }
};
