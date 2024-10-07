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
        Schema::table('related_partner', function (Blueprint $table) {
            $table->string('seat')->nullable();
            $table->string('check_in')->nullable();
            $table->string('deed')->nullable();
            $table->date('deed_date')->nullable();
            $table->string('legal_circuit')->nullable();
            $table->string('notary')->nullable();
            $table->string('sheet')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('related_partner', function (Blueprint $table) {
            $table->dropColumn('seat');
            $table->dropColumn('check_in');
            $table->dropColumn('deed');
            $table->dropColumn('deed_date');
            $table->dropColumn('legal_circuit');
            $table->dropColumn('notary');
            $table->dropColumn('sheet');
        });
    }
};
