<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'external_payment_provider_id',
        'external_payment_provider_type',
        'external_payment_provider_return'
    ];

    # Relationships

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
