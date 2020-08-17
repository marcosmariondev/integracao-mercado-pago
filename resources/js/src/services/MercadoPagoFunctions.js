export function setExternalMercadoPagoScript() {
    const script = document.createElement('script');
    script.src = "https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
        document.body.removeChild(script);
    }
    window.Mercadopago.setPublishableKey("TEST-4924720750242864-081520-6a68b7a85b747c2796222ff54b818a1f-161880727");
}

export function guessPaymentMethod(event) {

    window.Mercadopago.setPublishableKey("TEST-44b5aa4d-2ad7-4ba0-9937-d80ab4af8860");

    let cardnumber = event.target.value;

    if (cardnumber.length >= 6) {
        let bin = cardnumber.substring(0, 6);

        const payment_method = window.Mercadopago.getPaymentMethod({
            "bin": bin
        }, setPaymentMethod);

    }
};

export async function setPaymentMethod(status, response) {
    console.log('entrou aqui!')
    if (status == 200) {
        console.log('entrou')
        let paymentMethodId = response[0].id;
        let element = document.getElementById('payment_method_id');
        element.value = paymentMethodId;
        getInstallments();
    } else {
        alert(`payment method info error: ${response}`);
    }
}

export function getInstallments() {
    window.Mercadopago.getInstallments({
        "payment_method_id": document.getElementById('payment_method_id').value,
        "amount": parseFloat(document.getElementById('transaction_amount').value)

    }, function (status, response) {
        if (status == 200) {
            document.getElementById('installments').options.length = 0;
            response[0].payer_costs.forEach(installment => {
                let opt = document.createElement('option');
                opt.text = installment.recommended_message;
                opt.value = installment.installments;
                document.getElementById('installments').appendChild(opt);
            });
        } else {
            alert(`installments method info error: ${response}`);
        }
    });
}
