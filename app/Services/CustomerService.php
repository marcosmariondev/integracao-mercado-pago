<?php


namespace App\Services;


use App\Models\Customer;
use App\Models\User;

class CustomerService
{

    public function storeCustomerFromUserTestMercadoPago($test_user_mercadopago, User $user): Customer
    {

        $obj = new Customer();
        $obj->user_id = $user->id;
        $obj->external_payment_provider_id = $test_user_mercadopago["id"];
        $obj->external_payment_provider_type = 'MercadoPago';
        $obj->external_payment_provider_return = json_encode($test_user_mercadopago);
        $obj->save();

        return $obj;

    }
}
