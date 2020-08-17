<?php

namespace App\Http\Controllers;

use App\Services\CheckoutService;
use App\Services\MercadoPagoService;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{

    /**
     * @var CheckoutService
     */
    private $service;
    /**
     * @var MercadoPagoService
     */
    private $mercadoPagoService;

    public function __construct(CheckoutService $service, MercadoPagoService $mercadoPagoService)
    {
        $this->service = $service;
        $this->mercadoPagoService = $mercadoPagoService;
    }

    public function store(Request $request, CheckoutService  $checkoutService)
    {

        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'phone' => 'required',
            'cpf' => 'required|Cpf|unique:users',
            'zipcode' => 'required',
            'street' => 'required',
            'address_complement' => 'required',
            'neighborhood' => 'required',
            'city' => 'required',
            'state' => 'required',
           // 'product_payment_type' => 'required',
        ]);

        $this->mercadoPagoService->sendPayment($request->all());

        return response()->json('Checkout created!');
    }

}
