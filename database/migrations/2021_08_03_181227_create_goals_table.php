<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGoalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('goals', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->date('due_date')->default(date('Y-m-d'));
            $table
                ->enum('status', [
                    'COMPLETED',
                    'PROCESSING',
                    'ONHOLD',
                    'PENDING',
                ])
                ->default('PENDING');
            $table
                ->enum('priority', ['UNSET', 'LOW', 'MEDIUM', 'HIGH'])
                ->default('UNSET');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('goals');
    }
}
