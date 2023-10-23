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

            $table->mediumText('description');
            $table->decimal('item_discount');
            $table->integer('item_order');
            $table->mediumText('long_description');
            $table->decimal('qty');
            $table->decimal('rate');
            $table->string('type');
            $table->string('unit');
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
