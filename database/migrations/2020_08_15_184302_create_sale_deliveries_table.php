<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSaleDeliveriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sale_deliveries', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('sale_id')->unsigned();
            $table->foreign('sale_id')
                ->references('id')
                ->on('customers')
                ->onDelete('restrict');

            $table->string('external_payment_provider_id');
            $table->enum('external_payment_provider_type', ['MercadoPago'])->default('MercadoPago');
            $table->json('external_payment_provider_return')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sale_deliveries');
    }
}
