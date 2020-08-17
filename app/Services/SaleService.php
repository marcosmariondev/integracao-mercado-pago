<?php


namespace App\Services;


use App\Models\Sale;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class SaleService
{

    public function paginate(int $limit): LengthAwarePaginator
    {

        return $this->buildQuery()->paginate($limit);
    }

    private function buildQuery(): Builder
    {

        $query = Sale::query();

        $query->when(request('id'), function ($query, $id) {

            return $query->whereId($id);
        });

        return $query->orderByDesc('id');
    }



    public function store(array $data, $payment_mercadopago, $customer): Sale
    {

        $obj = new Sale();
        $obj->customer_id = $customer->id;
        $obj->product = $data['product_name'];
        $obj->amount = floatval($data['product_value']);
        $obj->payment_type = "ticket";
        $obj->ticket_url = $payment_mercadopago->transaction_details->external_resource_url;
        $obj->latest_status = "pending";
        $obj->external_payment_provider_id = $payment_mercadopago->id;
        $obj->external_payment_provider_type = 'MercadoPago';
        $obj->external_payment_provider_return = $this->clearJson($payment_mercadopago);;
        $obj->save();

        return $obj;

    }

    private function clearJson($obj)
    {
        $obj_to_arr = $this->stdToArray($obj);
        return str_replace('\u0000*\u0000', '', json_encode($obj_to_arr));
    }

    private function stdToArray($obj){
        $reaged = (array)$obj;
        foreach($reaged as $key => &$field){
            if(is_object($field))$field = $this->stdToArray($field);
        }
        return $reaged;
    }

}
