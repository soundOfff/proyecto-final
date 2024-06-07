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
        Schema::table('tasks', function (Blueprint $table) {
            $table->foreignId('author_id')->after('id')->nullable()->constrained('staff')->onDelete('cascade');
        });
        Schema::table('processes', function (Blueprint $table) {
            $table->foreignId('author_id')->after('id')->nullable()->constrained('staff')->onDelete('cascade');
        });
        Schema::table('procedures', function (Blueprint $table) {
            $table->foreignId('author_id')->after('id')->nullable()->constrained('staff')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['author_id']);
            $table->dropColumn('author_id');
        });
        Schema::table('processes', function (Blueprint $table) {
            $table->dropForeign(['author_id']);
            $table->dropColumn('author_id');
        });
        Schema::table('procedures', function (Blueprint $table) {
            $table->dropForeign(['author_id']);
            $table->dropColumn('author_id');
        });
    }
};
