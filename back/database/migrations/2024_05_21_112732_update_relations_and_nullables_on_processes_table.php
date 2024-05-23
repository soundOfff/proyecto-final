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
        Schema::table('processes', function (Blueprint $table) {
            $table->dropForeign(['project_id']);
            $table->dropColumn('project_id');
            $table->foreignId('project_service_type_id')->nullable()->after('id')->constrained();
            $table->string('department')->nullable()->change();
            $table->string('description')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('processes', function (Blueprint $table) {
            $table->dropForeign(['project_service_type_id']);
            $table->dropColumn('project_service_type_id');
            $table->foreignId('project_id')->nullable()->after('id')->constrained();
            $table->string('department')->nullable(false)->change();
            $table->string('description')->nullable(false)->change();
        });
    }
};
