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
            
            $table->foreignId('invoice_id')->nullable()->constrained();
            $table->foreignId('task_priority_id')->constrained();
            $table->foreignId('repeat_id')->constrained('expense_repeats');
            $table->foreignId('task_status_id')->constrained();
            $table->foreignId('partner_id')->constrained();
            $table->foreignId('owner_id')->constrained('staff');
            $table->morphs('taskable');

            $table->mediumText('name');
            $table->date('start_date');

            $table->integer('added_from')->nullable();
            $table->boolean('custom_recurring')->nullable();
            $table->integer('cycles')->nullable();
            $table->dateTime('date_added')->nullable();
            $table->dateTime('date_finished')->nullable();
            $table->integer('deadline_notified')->nullable();
            $table->text('description')->nullable();
            $table->date('due_date')->nullable();
            $table->decimal('hourly_rate')->default(0.00);
            $table->boolean('is_added_from_contact')->nullable();
            $table->integer('is_recurring_from')->nullable();
            $table->integer('kanban_order')->nullable();
            $table->date('last_recurring_date')->nullable();
            $table->integer('milestone')->nullable();
            $table->integer('milestone_order')->nullable();
            $table->integer('recurring')->nullable();
            $table->string('recurring_type')->nullable();
            $table->integer('repeat_every')->nullable();
            $table->integer('total_cycles')->nullable();

            $table->boolean('visible_to_client')->default(false);
            $table->boolean('is_public')->default(false);
            $table->boolean('is_infinite')->default(false);
            $table->boolean('billable')->default(false);
            $table->boolean('billed')->default(false);

            $table->timestamps();
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
