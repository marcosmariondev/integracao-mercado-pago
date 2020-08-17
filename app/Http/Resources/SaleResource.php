<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Church\Models\Church;
use Modules\Church\Services\ChurchService;

class SaleResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request)
    {

        return [

            'id' => $this->id,
            'customer' => $this->customer->user->name,
            'amount' => number_format($this->amount, 2,".", ","),
            'product' => $this->product,
            'ticket_url' => $this->ticket_url,
            'payment_type' => config('mercadopago')['PAYMENT_TYPE'][$this->payment_type],
            'latest_status' => config('mercadopago')['PAYMENT_STATUS'][$this->latest_status],
        ];

    }
}
