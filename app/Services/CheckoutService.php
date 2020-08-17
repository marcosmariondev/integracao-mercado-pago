<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;

class CheckoutService
{

    public function store($data)
    {

//        try {
//
//            \DB::beginTransaction();
//
//            $user = (new UserService())->store($data);
//            $customer = (new MercadoPagoService())->createCustomer($user);
//
//            $user = new User();
//            $user->fill($data);
//            $user->save();
//
//            \DB::commit();
//
//
//            return $user;
//
//        } catch (\GuzzleHttp\Exception\ClientException $e) {
//            \DB::rollback();
//            dd($e->getResponse());
//        }
    }



}
