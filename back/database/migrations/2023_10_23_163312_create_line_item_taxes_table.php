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
        Schema::create('line_item_taxes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('line_item_id')->nullable()->constrained();

            $table->unsignedBigInteger('line_item_taxable_id');
            $table->string('line_item_taxable_type');
            $table->index(['id', 'line_item_taxable_id', 'line_item_taxable_type'], 'line_item_taxable_index');

            $table->string('name');
            $table->decimal('rate');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('line_item_taxes');
    }
};
