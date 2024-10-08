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
        Schema::create('line_items', function (Blueprint $table) {
            $table->id();
            $table->morphs('line_itemable');
            $table->foreignId('line_item_type_id')->nullable()->constrained();

            $table->mediumText('description')->nullable();
            $table->decimal('discount')->nullable();
            $table->integer('item_order')->nullable();
            $table->mediumText('long_description')->nullable();
            $table->decimal('quantity');
            $table->decimal('rate');
            $table->string('unit')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('line_items');
    }
};
