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
            $table->foreignId('project_status_id')->constrained();
            $table->foreignId('jurisdiction_id')->constrained();
            $table->foreignId('project_billing_type_id')->constrained();
            $table->foreignId('project_service_type_id')->constrained();
            $table->foreignId('responsible_person_id')->constrained(table: 'contacts', indexName: 'projects_responsible_person_id_foreign');
            $table->foreignId('defendant_id')->constrained(table: 'partners', indexName: 'projects_defendant_id_foreign');
            $table->foreignId('plaintiff_id')->constrained(table: 'partners', indexName: 'projects_plaintiff_id_foreign');
            $table->integer('law_firm_id')->constrained();

            $table->integer('added_from');
            $table->date('date_finished');
            $table->date('deadline');
            $table->text('description');
            $table->decimal('estimated_hours');
            $table->string('name');
            $table->string('expedient');
            $table->integer('progress');
            $table->integer('progress_from_tasks');
            $table->decimal('cost');
            $table->decimal('rate_per_hour');
            $table->date('start_date');
            $table->float('amount');
            $table->integer('jury_number');
            $table->boolean('on_schedule');

            $table->timestamps();
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
