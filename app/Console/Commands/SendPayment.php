<?php

namespace App\Console\Commands;

use App\Services\MercadoPagoService;
use Illuminate\Console\Command;

class SendPayment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mercadopago:enviar-pagamento';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando para testar o envio de pagamento';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $testPayment = new MercadoPagoService();
        $testPayment->sendPaymentWithBoleto();
    }
}
