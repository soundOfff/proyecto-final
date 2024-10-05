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
            $table->foreignId('jurisdiction_id')->nullable()->constrained();
            $table->foreignId('project_billing_type_id')->constrained();
            $table->foreignId('project_service_type_id')->nullable()->constrained();
            $table->foreignId('responsible_person_id')->nullable()->constrained(table: 'staff', indexName: 'projects_responsible_person_id_foreign');
            $table->foreignId('defendant_id')->constrained(table: 'partners', indexName: 'projects_defendant_id_foreign');
            $table->foreignId('plaintiff_id')->nullable()->constrained(table: 'partners', indexName: 'projects_plaintiff_id_foreign');

            $table->integer('law_firm_id')->nullable();
            $table->integer('added_from')->nullable();
            $table->date('date_finished')->nullable();
            $table->date('deadline')->nullable();
            $table->text('description')->nullable();
            $table->decimal('estimated_hours')->nullable();
            $table->string('name');
            $table->string('expedient')->nullable();
            $table->integer('progress')->nullable();
            $table->integer('progress_from_tasks')->nullable();
            $table->decimal('cost')->nullable();
            $table->decimal('rate_per_hour')->nullable();
            $table->date('start_date')->nullable();
            $table->float('amount')->nullable();
            $table->integer('jury_number')->nullable();
            $table->boolean('on_schedule')->nullable();

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
