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
        Schema::table('line_items', function (Blueprint $table) {
            $table->foreignId('task_id')->nullable()->default(null)->constrained();
            $table->foreignId('expense_id')->nullable()->default(null)->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('line_items', function (Blueprint $table) {
            $table->dropConstrainedForeignId('task_id');
            $table->dropConstrainedForeignId('expense_id');
        });
    }
};
