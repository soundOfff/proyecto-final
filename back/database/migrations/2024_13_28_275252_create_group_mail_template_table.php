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
        Schema::create('group_mail_template', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mail_template_id')->constrained()->onDelete('cascade');
            $table->foreignId('group_id')->constrained('mail_template_groups')->onDelete('cascade');
            $table->string('relation');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_mail_template');
    }
};
