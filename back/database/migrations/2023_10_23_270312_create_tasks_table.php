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
            $table->morphs('taskable');

            $table->integer('added_from')->nullable();
            $table->boolean('billable');
            $table->boolean('billed');
            $table->boolean('custom_recurring')->nullable();
            $table->integer('cycles')->nullable();
            $table->dateTime('date_added')->nullable();
            $table->dateTime('date_finished')->nullable();
            $table->integer('deadline_notified')->nullable();
            $table->text('description')->nullable();
            $table->date('due_date')->nullable();
            $table->decimal('hourly_rate')->default(0.00);
            $table->boolean('is_added_from_contact')->nullable();
            $table->boolean('is_public')->default(false);
            $table->boolean('is_infinite')->default(false);
            $table->integer('is_recurring_from')->nullable();
            $table->integer('kanban_order')->nullable();
            $table->date('last_recurring_date')->nullable();
            $table->integer('milestone')->nullable();
            $table->integer('milestone_order')->nullable();
            $table->mediumText('name');
            $table->integer('priority');
            $table->integer('recurring');
            $table->string('recurring_type')->nullable();
            $table->integer('repeat_every')->nullable();
            $table->date('start_date');
            $table->integer('status');
            $table->integer('total_cycles')->nullable();
            $table->boolean('visible_to_client')->default(false);

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
