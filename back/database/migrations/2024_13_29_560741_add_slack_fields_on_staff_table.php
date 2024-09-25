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
        Schema::table('staff', function (Blueprint $table) {
            $table->string('slack_workspace_id')->nullable()->default(null);
            $table->foreign('slack_workspace_id')->references('slack_workspace_id')->on('slack_workspaces');
            $table->string('google_token')->nullable()->default(null);
            $table->string('slack_channel')->nullable()->default(null);
            $table->string('slack_token')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('staff', function (Blueprint $table) {
            $table->dropForeign(['slack_workspace_id']);
            $table->dropColumn('slack_workspace_id');
            $table->dropColumn('google_token');
            $table->dropColumn('slack_channel');
            $table->dropColumn('slack_token');
        });
    }
};
