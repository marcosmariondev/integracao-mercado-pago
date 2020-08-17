import React, {useEffect, useState} from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Sales() {

    const [sales, setSales] = useState([]);

    async function getSales() {
        const res = await api.get('sales');
        setSales(res.data.data)

    }

    useEffect(() => {
            getSales()
        },
        []
    );

    return (

        <div className="row">

            <div className="col-12 text-right">
                <Link to="/ticket" className="btn btn-success mb-3">Simular venda</Link>
            </div>

            <div className="col-12">
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered dataTable">
                        <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Último status</th>
                            <th>Tipo de pagamento</th>
                            <th>Produto</th>
                            <th>Boleto</th>
                            <th>Valor</th>
                        </tr>
                        </thead>
                        <tbody>

                        {sales && sales.map((sale) => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.customer}</td>
                                    <td>{sale.latest_status}</td>
                                    <td>{sale.payment_type}</td>
                                    <td>{sale.product}</td>
                                    <td><a target="_blank" href={sale.ticket_url} >Enviar boleto</a></td>
                                    <td>{sale.amount}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                </div>
            </div>

        </div>

    );
}
