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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained();
            $table->morphs('taskable');

            $table->integer('added_from');
            $table->boolean('billable');
            $table->boolean('billed');
            $table->boolean('custom_recurring');
            $table->integer('cycles');
            $table->dateTime('date_added');
            $table->dateTime('date_finished');
            $table->integer('deadline_notified');
            $table->text('description');
            $table->date('due_date');
            $table->decimal('hourly_rate');
            $table->boolean('is_added_from_contact');
            $table->boolean('is_public');
            $table->integer('is_recurring_from');
            $table->integer('kanban_order');
            $table->date('last_recurring_date');
            $table->integer('milestone');
            $table->integer('milestone_order');
            $table->mediumText('name');
            $table->integer('priority');
            $table->integer('recurring');
            $table->string('recurring_type');
            $table->integer('repeat_every');
            $table->date('start_date');
            $table->integer('status');
            $table->integer('total_cycles');
            $table->boolean('visible_to_client');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
