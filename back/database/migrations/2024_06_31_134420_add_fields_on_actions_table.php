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
        Schema::table('actions', function (Blueprint $table) {
            $table->foreignId('action_type_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('procedure_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('description');
            $table->boolean('is_completed')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('actions', function (Blueprint $table) {
            $table->dropForeign(['action_type_id']);
            $table->dropForeign(['procedure_id']);
            $table->dropColumn('action_type_id');
            $table->dropColumn('procedure_id');
            $table->dropColumn('description');
            $table->dropColumn('is_completed');
        });
    }
};
