<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'customer_id',
        'product',
        'amount',
        'ticket_url',
        'latest_status',
        'payment_type',
        'external_payment_provider_id',
        'external_payment_provider_type',
        'external_payment_provider_return'
    ];

    # Relationships

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

}
