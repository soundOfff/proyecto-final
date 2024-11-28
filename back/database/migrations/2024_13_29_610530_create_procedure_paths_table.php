<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProcedurePathsTable extends Migration
{
    public function up()
    {
        Schema::create('procedure_paths', function (Blueprint $table) {
            $table->id();
            $table->foreignId('from_procedure_id')->constrained('procedures')->onDelete('cascade');
            $table->foreignId('to_procedure_id')->nullable()->constrained('procedures')->onDelete('cascade');
            $table->json('condition')->nullable(); // Optional, to store conditions in JSON format
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('procedure_paths');
    }
}
