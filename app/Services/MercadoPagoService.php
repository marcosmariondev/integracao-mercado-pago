<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Customer;
use App\Models\User;

class MercadoPagoService
{

    private $key;
    private $token;
    /**
     * @var CustomerService
     */
    private $customerService;

    public function __construct()
    {
        $this->key = config('mercadopago')['KEY'];
        $this->token = config('mercadopago')['TOKEN'];
        $this->customerService = (new CustomerService());

        \MercadoPago\SDK::setAccessToken($this->token);
    }

    public function createCustomer(User $user): Customer
    {

        $customer_mp = new \MercadoPago\Customer();
        $customer_mp->email = $user->email;
        $customer_mp->save();

        return $this->customerService->storeCustomerByMercadoPago($customer_mp, $user);

    }

    private function createCard($customer_id, $token)
    {
        #expiration_month: null
        #expiration_year: null
        #first_six_digits: null
        #last_four_digits: null
        #payment_method: null
        #security_code: null

        $card = new \MercadoPago\Card();
        $card->customer_id = $customer_id;
        $card->token = $token;
        $card->save();

        return $card;


    }

    public function sendPayment($data)
    {

        try {
            \DB::beginTransaction();

            $user = (new UserService())->store($data);
            $test_user_mercadopago = $this->createUserTest();

            $customer = (new CustomerService())->storeCustomerFromUserTestMercadoPago($test_user_mercadopago, $user);

            $payment = new \MercadoPago\Payment();
            $payment->transaction_amount = $data['product_value'];
            $payment->description = $data['name'];
            $payment->payment_method_id = "bolbradesco";
            $payment->payer = array(
                "email" => $data['email'],
                "first_name" => "Test",
                "last_name" => "User",
                "identification" => array(
                    "type" => "CPF",
                    "number" => $data['cpf']
                ),
                "address" => array(
                    "zip_code" => $data['zipcode'],
                    "street_name" => $data['street'],
                    "street_number" => $data['number'],
                    "neighborhood" => $data['neighborhood'],
                    "city" => $data['city'],
                    "federal_unit" => $data['state'],
                )
            );

            $payment->save();
            $sale = (new SaleService())->store($data, $payment, $customer);

            \DB::commit();

            return $sale;

        } catch (\exception $e) {
            \DB::rollback();
            dd($e->getMessage());
        }

    }

    public
    function getIdentificationTypes()
    {
        return \MercadoPago\SDK::get('/v1/identification_types');
    }

    public
    function getPaymentMethods()
    {
        return \MercadoPago\SDK::get('/v1/payment_methods');
    }


    public
    function createUserTest()
    {

        $test_user = \MercadoPago\SDK::post('/users/test_user', [
            "json_data" => [
                "site_id" => "MLB"
            ]
        ]);

        if ($test_user['code'] == 403) {
            //acabou os usuarios de teste
            //     "id" => 626822393
            //    "nickname" => "TESTSNTLAFJ0"
            //    "password" => "qatest4226"
            //    "site_status" => "active"
            //    "email" => "test_user_84198054@testuser.com"

            return [
                "id" => 626818131,
                "nickname" => "TETE5385524",
                "password" => "qatest168",
                "site_status" => "active",
                "email" => "test_user_19025315@testuser.com"
            ];
        }

        return $test_user['body'];


    }


}
