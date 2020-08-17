<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::post('checkout', 'CheckoutController@store');
Route::get('sales', 'SaleController@index');

//mercado pago
Route::post('criar-usuario-teste', 'MercadoPagoController@createUserTest');
Route::get('tipos-de-indentificacao', 'MercadoPagoController@getIdentificationTypes');
Route::get('metodos-de-pagamento', 'MercadoPagoController@getPaymentMethods');
