import React, {useCallback, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import api from "../services/api"
import axios from "axios";

export default function CheckoutTicket() {
    const {register, errors, handleSubmit, setValue} = useForm({
        mode: 'onBlur',
    });

    const history = useHistory();
    const [paymentType, setPaymentType] = useState('ticket');

    const [loadingForm, setLoadingForm] = useState(false);

    const cpfMask = event => {

        const cpf = event.target.value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')

        setValue('cpf', cpf)
    }

    const cep = useCallback(
        async (event) => {
            try {

                const response = await axios.get(`https://viacep.com.br/ws/${event.target.value}/json/`);

                if (response.data) {
                    setValue('neighborhood', response.data.bairro)
                    setValue('address_complement', response.data.complemento)
                    setValue('state', response.data.uf)
                    setValue('city', response.data.localidade)
                    setValue('street', response.data.logradouro)
                }

            } catch (e) {
                console.log(e)
            }
        },
        []
    );

    const onSubmit = useCallback(
        async (form) => {
            setLoadingForm(true)
            try {
                const response = await api.post("/checkout", form);
                setLoadingForm(false)
                history.push("/");
            } catch (e) {
                setLoadingForm(false)
                let errors = e.response.data.errors
                alert(JSON.stringify(errors))
            }
        },
        []
    );

    return (

        <div className="row">

            <div className="col-12 text-right">
                <Link to="/" className="btn btn-success mb-3">Voltar para listagem</Link>
            </div>

            <div className="col-12">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-row mb-3">
                        <div className="col-md-6 ">
                            <label htmlFor="name">Nome</label>
                            <input name="name" className="form-control" ref={register({
                                required: 'Campo obrigatório',
                                minLength: {
                                    value: 5,
                                    message: 'Seu nome precisa conter pelo menos 5 caracteres',
                                },
                            })}/>
                            <div className="text-danger">
                                {errors.name && errors.name.message}
                            </div>
                        </div>

                        <div className="col-md-6 ">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" className="form-control" ref={register({
                                required: 'Campo obrigatório',
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: 'Email incorreto',
                                },
                            })}/>

                            <div className="text-danger">
                                {errors.email && errors.email.message}
                            </div>

                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-md-6 ">
                            <label htmlFor="phone">Telefone</label>
                            <input name="phone" className="form-control" ref={register({
                                required: 'Campo obrigatório'
                            })}/>
                            <div className="text-danger">
                                {errors.phone && errors.phone.message}
                            </div>
                        </div>

                        <div className="col-md-6 ">
                            <label htmlFor="cpf">Cpf</label>
                            <input name="cpf" onChange={cpfMask} className="form-control" ref={register({
                                required: 'Campo obrigatório',
                                pattern: {
                                    value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                                    message: 'Cpf inválido',
                                },
                            })}/>


                            <div className="text-danger">
                                {errors.cpf && errors.cpf.message}
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-row">
                        <div className="col-md-6 ">
                            <label htmlFor="zipcode">Cep</label>
                            <input onBlur={cep} name="zipcode" className="form-control" ref={register({
                                required: 'Campo obrigatório'
                            })}/>
                            <div className="text-danger">
                                {errors.zipcode && errors.zipcode.message}
                            </div>
                        </div>

                        <div className="col-md-6 ">
                            <label htmlFor="street">Rua</label>
                            <input name="street" className="form-control" ref={register({
                                required: 'Campo obrigatório'
                            })}/>
                            <div className="text-danger">
                                {errors.street && errors.street.message}
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-md-2 ">
                            <label htmlFor="number">Número</label>
                            <input name="number" className="form-control" ref={register}/>
                            <div className="text-danger">
                                {errors.number && errors.number.message}
                            </div>
                        </div>

                        <div className="col-md-5 ">
                            <label htmlFor="address_complement">Complemento</label>
                            <input name="address_complement" className="form-control" ref={register({
                                required: 'Campo obrigatório'
                            })}/>
                            <div className="text-danger">
                                {errors.address_complement && errors.address_complement.message}
                            </div>
                        </div>

                        <div className="col-md-5 ">
                            <label htmlFor="neighborhood">Bairro</label>
                            <input name="neighborhood" className="form-control" ref={register({
                                required: 'Campo obrigatório'
                            })}/>
                            <div className="text-danger">
                                {errors.neighborhood && errors.neighborhood.message}
                            </div>
                        </div>


                    </div>

                    <div className="form-row mb-3">
                        <div className="col-md-6 ">
                            <label htmlFor="city">Cidade</label>
                            <input name="city" className="form-control" ref={register({
                                required: 'Campo obrigatório'
                            })}/>
                            <div className="text-danger">
                                {errors.city && errors.city.message}
                            </div>
                        </div>

                        <div className="col-md-6 ">
                            <label htmlFor="state">Estado</label>
                            <input name="state" className="form-control" ref={register({
                                required: 'Campo obrigatório'
                            })}/>
                            <div className="text-danger">
                                {errors.state && errors.state.message}
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <h3>Produto</h3>

                    <div className="form-row mb-3">
                        <div className="col-md-6 ">
                            <label htmlFor="product_name">Produto</label>
                            <select defaultValue="camisa" name="product_name" className="form-control" ref={register({
                                required: 'Campo obrigatório'
                            })}>
                                <option value="camisa">Camisa</option>
                                <option value="celular">Celular</option>
                            </select>
                            <div className="text-danger">
                                {errors.product && errors.product.message}
                            </div>
                        </div>

                        <div className="col-md-3 ">
                            <label htmlFor="product_value">Valor</label>
                            <input type="number" defaultValue="100" name="product_value" className="form-control"
                                   ref={register({
                                       required: 'Campo obrigatório'
                                   })}/>
                            <div className="text-danger">
                                {errors.product_value && errors.product_value.message}
                            </div>
                        </div>

                        <div className="col-md-3 ">
                            <label htmlFor="product_payment_type">Como prefere pagar</label>
                            <select defaultValue="ticket" name="product_payment_type"
                                    onChange={(event) => setPaymentType(event.target.value)} className="form-control"
                                    ref={register({
                                        required: 'Campo obrigatório'
                                    })}>
                                <option value="ticket">Boleto</option>
                                <option value="credit_card">Cartao</option>
                            </select>
                            <div className="text-danger">
                                {errors.product && errors.product.message}
                            </div>
                        </div>

                    </div>


                    <hr/>

                    <hr/>


                    {paymentType == 'credit_card' &&
                    <>
                        <h3>Dados do cartão {paymentType}</h3>

                        <div className="form-row mb-3">
                            <div className="col-md-3  ">
                                <label htmlFor="cardNumber">Número do cartão</label>
                                <input value="4170 0688 1010 8020" name="cardNumber" className="form-control"
                                       ref={register({
                                           required: 'Campo obrigatório'
                                       })}/>
                                <div className="text-danger">
                                    {errors.cardNumber && errors.cardNumber.message}
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="cardholderName">Nome impresso no cartão</label>
                                <input value="Marcos Marion" name="cardholderName" className="form-control"
                                       ref={register({
                                           required: 'Campo obrigatório'
                                       })}/>
                                <div className="text-danger">
                                    {errors.address_complement && errors.address_complement.message}
                                </div>
                            </div>

                            <div className="col-md-2">
                                <label htmlFor="expiration_month">Mês de expiração</label>
                                <select value="11" name="expiration_month" className="form-control" ref={register({
                                    required: 'Campo obrigatório'
                                })}>
                                    <option value="11">11</option>
                                </select>
                                <div className="text-danger">
                                    {errors.expiration_month && errors.expiration_month.message}
                                </div>
                            </div>

                            <div className="col-md-2">
                                <label htmlFor="expiration_year">Ano de expiração</label>
                                <select value="25" name="expiration_year" className="form-control" ref={register({
                                    required: 'Campo obrigatório'
                                })}>
                                    <option value="25">2025</option>
                                </select>
                                <div className="text-danger">
                                    {errors.expiration_year && errors.expiration_year.message}
                                </div>
                            </div>

                            <div className="col-md-2">
                                <label htmlFor="security_code">CVV</label>
                                <input value="123" name="security_code" className="form-control" ref={register({
                                    required: 'Campo obrigatório'
                                })}/>
                                <div className="text-danger">
                                    {errors.security_code && errors.security_code.message}
                                </div>
                            </div>

                        </div>
                    </>
                    }

                    <button disabled={loadingForm} className="btn btn-primary btn-lg btn-block" type="submit">
                        {!loadingForm ? "Confirmar a compra" : "Aguarde...."}
                    </button>

                </form>
            </div>

        </div>
    );
}
