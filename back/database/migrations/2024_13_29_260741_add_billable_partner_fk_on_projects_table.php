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
        Schema::table('projects', function (Blueprint $table) {
            $table->dropForeign('projects_defendant_id_foreign');
            $table->dropColumn('defendant_id');

            $table->foreignId('billable_partner_id')->after('id')->nullable()->constrained('partners');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->foreignId('defendant_id')->constrained(table: 'partners');

            $table->dropForeign('projects_billable_partner_id_foreign');
            $table->dropColumn('billable_partner_id');
        });
    }
};
