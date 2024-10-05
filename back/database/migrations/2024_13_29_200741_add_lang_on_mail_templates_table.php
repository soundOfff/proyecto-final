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
        Schema::table('mail_templates', function (Blueprint $table) {
            $table->foreignId('lang_id')->nullable()->constrained('mail_template_languages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mail_templates', function (Blueprint $table) {
            $table->dropForeign(['lang_id']);
            $table->dropColumn('lang_id');
        });
    }
};
