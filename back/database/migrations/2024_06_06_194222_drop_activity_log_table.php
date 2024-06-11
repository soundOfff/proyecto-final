<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivityLogTable extends Migration
{
    public function up()
    {
        Schema::dropIfExists('activity_log');
    }

    public function down()
    {
        Schema::create('activity_log', function (Blueprint $table) {
            $table->id();
            $table->foreignId('staff_id')->constrained();

            $table->dateTime('date');
            $table->string('description');

            $table->timestamps();
        });
    }
}
