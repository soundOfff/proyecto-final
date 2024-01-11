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

            $table->mediumText('description')->nullable();
            $table->decimal('item_discount');
            $table->integer('item_order');
            $table->mediumText('long_description')->nullable();
            $table->decimal('quantity');
            $table->decimal('rate');
            $table->string('type')->nullable();
            $table->string('unit');

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
