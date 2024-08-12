<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_group_id')->nullable()->constrained();
            $table->foreignId('tax_id')->nullable()->constrained();
            $table->foreignId('tax2_id')->nullable()->constrained('taxes');

            $table->mediumText('description');
            $table->text('long_description')->nullable();
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
        Schema::dropIfExists('items');
    }
};
