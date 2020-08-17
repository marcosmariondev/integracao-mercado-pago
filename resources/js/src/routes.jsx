
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header'
import Checkout from './pages/Checkout'
import CheckoutTicket from './pages/CheckoutTicket'
import Sales from './pages/Sales'

export const Routes = () =>  {

        return (
            <BrowserRouter>

                    <Header />
                    <Route path="/" exact component={Sales} />
                    <Route path="/ticket" exact component={CheckoutTicket} />

            </BrowserRouter>
        )

}

export default Routes;
