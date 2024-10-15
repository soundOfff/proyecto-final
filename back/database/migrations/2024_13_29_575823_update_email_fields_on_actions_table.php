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
        Schema::table('actions', function (Blueprint $table) {
            $table->string('mail_to')->nullable();
            $table->foreignId('mail_template_id')->nullable()->constrained('mail_templates');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('actions', function (Blueprint $table) {
            $table->dropColumn('mail_to');
            $table->dropForeign(['mail_template_id']);
            $table->dropColumn('mail_template_id');
        });
    }
};
