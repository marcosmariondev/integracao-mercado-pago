import React, {useCallback, useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import api from "../services/api"
import {guessPaymentMethod, setExternalMercadoPagoScript} from "../services/MercadoPagoFunctions"

export default function Checkout() {

    useEffect(setExternalMercadoPagoScript, []);

    const {register, errors, handleSubmit} = useForm({
        mode: 'onBlur',
    });

    const [paymentType, setPaymentType] = useState('boleto');

    const handleCheckout = useCallback(
        async (form) => {
            try {
                var allFormValues = document.querySelector('#pay');
                await window.Mercadopago.createToken(allFormValues, (status, response) => {
                    const checkout = api.post("/checkout", {...form, token: response.id})
                    history.push("/sales");
                });
            } catch (e) {
                console.log(e)
            }
        },
        []
    );

    return (

        <form onSubmit={handleSubmit(handleCheckout)} method="post" id="pay" name="pay">
            <fieldset>
                <p>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" defaultValue="asdasdada" ref={register}/>
                </p>
                <p>
                    <label htmlFor="transaction_amount">Amount to pay</label>
                    <input name="transaction_amount" id="transaction_amount" defaultValue="100" ref={register}/>
                </p>
                <p>
                    <label htmlFor="cardNumber">Card number 5031 7557 3453 0604</label>
                    <input type="text" id="cardNumber" onChange={guessPaymentMethod} name="cardNumber"
                           ref={register}

                    />
                </p>
                <p>
                    <label htmlFor="cardholderName">Name and surname</label>
                    <input type="text" id="cardholderName" name="cardholderName"/>
                </p>
                <p>
                    <label htmlFor="cardExpirationMonth">Expiration month</label>
                    <input type="text" id="cardExpirationMonth" name="cardExpirationMonth"
                           ref={register}
                    />
                </p>
                <p>
                    <label htmlFor="cardExpirationYear">Expiration year</label>
                    <input type="text" id="cardExpirationYear" name="cardExpirationYear"
                           ref={register}
                    />
                </p>
                <p>
                    <label htmlFor="securityCode">Security code</label>
                    <input type="text" id="securityCode" name="securityCode"
                           ref={register}
                    />
                </p>
                <p>
                    <label htmlFor="installments">Installments</label>
                    <select id="installments" className="form-control" name="installments" defaultValue="1"
                            ref={register}></select>
                </p>
                <p>
                    <label htmlFor="docType">ID type</label>
                    <select id="docType" name="docType" ref={register}></select>
                </p>
                <p>
                    <label htmlFor="docNumber">ID number</label>
                    <input type="text" id="docNumber" name="docNumber" ref={register}/>
                </p>
                <p>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" defaultValue="test@test.com" ref={register}/>
                </p>
                <input type="hidden" name="payment_method_id" id="payment_method_id" ref={register}/>
                <input type="hidden" name="token" id="token" ref={register}/>
                <input type="submit" value="Pay"/>
            </fieldset>
        </form>

        // <form id="pay" onSubmit={handleSubmit(handleCheckout)}>
        //
        //     <div className="form-row mb-3">
        //         <div className="col-md-6 ">
        //             <label htmlFor="name">Nome</label>
        //             <input name="name" className="form-control" ref={register({
        //                 required: 'Campo obrigatório',
        //                 minLength: {
        //                     value: 5,
        //                     message: 'Seu nome precisa conter pelo menos 5 caracteres',
        //                 },
        //             })}/>
        //             <div className="text-danger">
        //                 {errors.name && errors.name.message}
        //             </div>
        //         </div>
        //
        //         <div className="col-md-6 ">
        //             <label htmlFor="email">Email</label>
        //             <input type="text" name="email" className="form-control" ref={register({
        //                 required: 'Campo obrigatório',
        //                 pattern: {
        //                     value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        //                     message: 'Email incorreto',
        //                 },
        //             })}/>
        //
        //             <div className="text-danger">
        //                 {errors.email && errors.email.message}
        //             </div>
        //
        //         </div>
        //     </div>
        //
        //     <div className="form-row">
        //         <div className="col-md-6 ">
        //             <label htmlFor="phone">Telefone</label>
        //             <input name="phone" className="form-control" ref={register({
        //                 required: 'Campo obrigatório'
        //             })}/>
        //             <div className="text-danger">
        //                 {errors.phone && errors.phone.message}
        //             </div>
        //         </div>
        //
        //         <div className="col-md-6 ">
        //             <label htmlFor="cpf">Cpf</label>
        //             <input name="cpf" className="form-control" ref={register({
        //                 required: 'Campo obrigatório'
        //             })}/>
        //             <div className="text-danger">
        //                 {errors.cpf && errors.cpf.message}
        //             </div>
        //         </div>
        //     </div>
        //
        //     <hr/>
        //
        //     <div className="form-row mb-3">
        //         <div className="col-md-6 ">
        //             <label htmlFor="zipcode">Cep</label>
        //             <input name="zipcode" className="form-control" ref={register({
        //                 required: 'Campo obrigatório'
        //             })}/>
        //             <div className="text-danger">
        //                 {errors.zipcode && errors.zipcode.message}
        //             </div>
        //         </div>
        //
        //         <div className="col-md-6 ">
        //             <label htmlFor="street">Rua</label>
        //             <input name="street" className="form-control" ref={register({
        //                 required: 'Campo obrigatório'
        //             })}/>
        //             <div className="text-danger">
        //                 {errors.street && errors.street.message}
        //             </div>
        //         </div>
        //     </div>
        //
        //     <div className="form-row">
        //         <div className="col-md-2 mb-3 ">
        //             <label htmlFor="number">Número</label>
        //             <input name="number" className="form-control" ref={register({
        //                 required: 'Campo obrigatório'
        //             })}/>
        //             <div className="text-danger">
        //                 {errors.number && errors.number.message}
        //             </div>
        //         </div>
        //
        //         <div className="col-md-5 ">
        //             <label htmlFor="address_complement">Complemento</label>
        //             <input name="address_complement" className="form-control" ref={register({
        //                 required: 'Campo obrigatório'
        //             })}/>
        //             <div className="text-danger">
        //                 {errors.address_complement && errors.address_complement.message}
        //             </div>
        //         </div>
        //
        //         <div className="col-md-5 ">
        //             <label htmlFor="neighborhood">Bairro</label>
        //             <input name="neighborhood" className="form-control" ref={register({
        //                 required: 'Campo obrigatório'
        //             })}/>
        //             <div className="text-danger">
        //                 {errors.neighborhood && errors.neighborhood.message}
        //             </div>
        //         </div>
        //
        //
        //     </div>
        //
        //     <div className="form-row mb-3">
        //         <div className="col-md-6 ">
        //             <label htmlFor="city">Cidade</label>
        //             <select name="city" value="teresina" className="form-control" ref={register({
        //                 required: 'Campo obrigatório'
        //             })}>
        //                 <option value="teresina">Teresina</option>
        //             </select>
        //             <div className="text-danger">
        //                 {errors.city && errors.city.message}
        //             </div>
        //         </div>
        //
        //         <div className="col-md-6 ">
        //             <label htmlFor="state">Estado</label>
        //             <select name="state" value="pi" className="form-control" ref={register({
        //                 required: 'Campo obrigatório'
        //             })}>
        //                 <option value="pi">Piauí</option>
        //             </select>
        //             <div className="text-danger">
        //                 {errors.state && errors.state.message}
        //             </div>
        //         </div>
        //     </div>
        //
        //     <hr/>
        //
        //     <h3>Produto</h3>
        //
        //
        //     <div className="form-row mb-3">
        //         <div className="col-md-6 ">
        //             <label htmlFor="product_name">Produto</label>
        //             <select value="camisa" name="product_name" className="form-control" ref={register({
        //                 required: 'Campo obrigatório'
        //             })}>
        //                 <option value="camisa">Camisa</option>
        //                 <option value="celular">Celular</option>
        //             </select>
        //             <div className="text-danger">
        //                 {errors.product && errors.product.message}
        //             </div>
        //         </div>
        //
        //         <div className="col-md-3 ">
        //             <label htmlFor="product_value">valor</label>
        //             <input type="number" value="100" name="product_value" className="form-control" ref={register({
        //                 required: 'Campo obrigatório'
        //             })}/>
        //             <div className="text-danger">
        //                 {errors.product_value && errors.product_value.message}
        //             </div>
        //         </div>
        //
        //         <div className="col-md-3 ">
        //             <label htmlFor="product_payment_type">Como prefere pagar</label>
        //             <select value="boleto" name="product_payment_type"
        //                     onChange={(event) => setPaymentType(event.target.value)} className="form-control"
        //                     ref={register({
        //                         required: 'Campo obrigatório'
        //                     })}>
        //                 <option value="boleto">Boleto</option>
        //                 <option value="cartao">Cartao</option>
        //             </select>
        //             <div className="text-danger">
        //                 {errors.product && errors.product.message}
        //             </div>
        //         </div>
        //
        //     </div>
        //
        //     <hr/>
        //
        //
        //     {paymentType == 'cartao' &&
        //     <>
        //         <h3>Dados do cartão {paymentType}</h3>
        //
        //         <div className="form-row mb-3">
        //             <div className="col-md-3  ">
        //                 <label htmlFor="cardNumber">Número do cartão</label>
        //                 <input value="4170 0688 1010 8020" name="cardNumber" className="form-control" ref={register({
        //                     required: 'Campo obrigatório'
        //                 })}/>
        //                 <div className="text-danger">
        //                     {errors.cardNumber && errors.cardNumber.message}
        //                 </div>
        //             </div>
        //
        //             <div className="col-md-3">
        //                 <label htmlFor="cardholderName">Nome impresso no cartão</label>
        //                 <input value="Marcos Marion" name="cardholderName" className="form-control" ref={register({
        //                     required: 'Campo obrigatório'
        //                 })}/>
        //                 <div className="text-danger">
        //                     {errors.address_complement && errors.address_complement.message}
        //                 </div>
        //             </div>
        //
        //             <div className="col-md-2">
        //                 <label htmlFor="expiration_month">Mês de expiração</label>
        //                 <select value="11" name="expiration_month" className="form-control" ref={register({
        //                     required: 'Campo obrigatório'
        //                 })}>
        //                     <option value="11">11</option>
        //                 </select>
        //                 <div className="text-danger">
        //                     {errors.expiration_month && errors.expiration_month.message}
        //                 </div>
        //             </div>
        //
        //             <div className="col-md-2">
        //                 <label htmlFor="expiration_year">Ano de expiração</label>
        //                 <select value="25" name="expiration_year" className="form-control" ref={register({
        //                     required: 'Campo obrigatório'
        //                 })}>
        //                     <option value="25">2025</option>
        //                 </select>
        //                 <div className="text-danger">
        //                     {errors.expiration_year && errors.expiration_year.message}
        //                 </div>
        //             </div>
        //
        //             <div className="col-md-2">
        //                 <label htmlFor="security_code">CVV</label>
        //                 <input value="123" name="security_code" className="form-control" ref={register({
        //                     required: 'Campo obrigatório'
        //                 })}/>
        //                 <div className="text-danger">
        //                     {errors.security_code && errors.security_code.message}
        //                 </div>
        //             </div>
        //
        //         </div>
        //     </>
        //     }
        //
        //
        //     <button className="btn btn-primary btn-lg btn-block" type="submit">Continuar a compra</button>
        //
        // </form>
    );
}
