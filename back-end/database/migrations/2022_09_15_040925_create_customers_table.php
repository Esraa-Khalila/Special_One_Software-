<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       
        Schema::create('customers', function (Blueprint $table) {
             $table->increments('id');
            $table->string('customer_name');
            $table->string('company_name');
            $table->string('trade_name');
            $table->string('logo');
            $table->string('Trade_Register_image');
            $table->string('contract_image');
            $table->char('ref_number');
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
        Schema::dropIfExists('customers');
       
    }
}
