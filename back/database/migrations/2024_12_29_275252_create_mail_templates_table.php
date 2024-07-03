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
        Schema::create('mail_templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mail_template_group_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('event');
            $table->string('subject');
            $table->string('send_from');
            $table->text('body');
            $table->string('send_to')->nullable();
            $table->boolean('formatted')->default(true);
            $table->boolean('disabled')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mail_templates');
    }
};
