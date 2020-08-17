<?php

namespace App\Http\Controllers;

use App\Services\CheckoutService;
use App\Services\MercadoPagoService;
use Illuminate\Http\Request;

class MercadoPagoController extends Controller
{

    /**
     * @var CheckoutService
     */
    private $service;
    /**
     * @var MercadoPagoService
     */
    private $mercadoPagoService;

    public function __construct(MercadoPagoService $service)
    {
        $this->service = $service;
    }

    public function createUserTest()
    {
        $this->service->createUserTest();
        return response()->json('Checkout created!');
    }

    public function getIdentificationTypes()
    {
        $indentifications = $this->service->getIdentificationTypes();
        return response()->json($indentifications);
    }

    public function getPaymentMethods()
    {
        $payment_methods = $this->service->getPaymentMethods();
        return response()->json($payment_methods);
    }



}
