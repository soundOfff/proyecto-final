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
        Schema::create('project_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('staff_id')->constrained();
            $table->foreignId('contact_id')->constrained();

            $table->dateTime('date_added');
            $table->text('description');
            $table->string('external');
            $table->text('external_link');
            $table->string('name');
            $table->string('type');
            $table->dateTime('last_activity');
            $table->string('subject');
            $table->text('thumbnail_link');
            $table->boolean('visible_to_customer');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_files');
    }
};
