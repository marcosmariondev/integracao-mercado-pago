<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('customer_id')->unsigned();
            $table->foreign('customer_id')
                ->references('id')
                ->on('customers')
                ->onDelete('restrict');

            $table->string('ticket_url')->nullable();
            $table->string('product');
            $table->float('amount', 8,2);

            $table->enum('latest_status', array_keys(config('mercadopago.PAYMENT_STATUS')))
                ->default('pending');

            $table->enum('payment_type',array_keys(config('mercadopago.PAYMENT_TYPE')))
                ->default('ticket');

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
        Schema::dropIfExists('sales');
    }
}
