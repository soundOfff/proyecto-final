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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->integer('added_from');
            $table->dateTime('date_finished');
            $table->date('deadline');
            $table->text('description');
            $table->decimal('estimated_hours');
            $table->string('name');
            $table->integer('progress');
            $table->integer('progress_from_tasks');
            $table->decimal('cost');
            $table->date('created');
            $table->decimal('rate_per_hour');
            $table->date('start_date');
            $table->integer('status');
            $table->integer('defendant_id');
            $table->integer('plaintiff_id');
            $table->float('amount');
            $table->integer('law_firm_id');
            $table->integer('jurisdiction_id');
            $table->integer('jury_number');
            $table->boolean('on_schedule');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
