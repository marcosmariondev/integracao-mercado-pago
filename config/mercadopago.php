<?php

return [
    //em prod trazer do env
    'KEY' => env('MERCADOPAGO_KEY', 'TEST-44b5aa4d-2ad7-4ba0-9937-d80ab4af8860'),
    'TOKEN' => env('MERCADOPAGO_TOKEN', 'TEST-4924720750242864-081520-6a68b7a85b747c2796222ff54b818a1f-161880727'),
    'PAYMENT_STATUS' => [
        'pending' => 'Pendente',
        'approved' => 'Aprovado',
        'authorized' => 'authorized',
        'in_process' => 'in_process',
        'in_mediation' => 'in_mediation',
        'rejected' => 'rejected',
        'cancelled' => 'cancelled',
        'refunded' => 'refunded',
        'charged_back' => 'charged_back',
    ],
    'PAYMENT_TYPE' => [
        'account_money' => 'account_money',
        'ticket' => 'Boleto',
        'bank_transfer' => 'bank_transfer',
        'atm' => 'atm',
        'credit_card' => 'Cartão de crédito',
        'debit_card' => 'Cartão de debito',
        'prepaid_card' => 'prepaid_card',
    ],

    ];
