/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState, useEffect }       from 'react';
import queryString                          from 'query-string';
import { connect }                          from 'react-redux';

// Components
import PayMethodInfo                        from './components/payMethodInfo';
import Receiving                            from './components/receiving';
import Product                              from './components/product';

// Modules
import Loading                              from '../../../../module/loading/mallLoading';

// Actions
import { ordersInfo }                       from '../../../../actions/myaccount';

const Index = props => {

    const [ loading, setPageLoading ] = useState(true);
    const [ info   , setPayInfo]      = useState({});

    useEffect(()=>{

        const { location } = props;
        const { pathname, search } = location;
        
        const delay = setTimeout(()=>{
            props.dispatch( ordersInfo(pathname,queryString.parse(search)) ).then( res => {
                setPageLoading( false );
                switch( res['status'] ){
                    case 200:
                        setPayInfo(res['data']);
                        break;

                    default:
                        break;
                }
                const { orderID, amount, orderStatus, payMethod, orderDetail } = res['data'];
                gtag('event', 'set_checkout_option', {
                    "checkout_option": "payment method",
                    "value": payMethod
                });
                gtag('event', 'set_checkout_option', {
                    "checkout_option": "payment status",
                    "value": orderStatus
                });
                let gaItems = [];
                orderDetail.map((od)=>{
                    gaItems.push({
                        "id": od['productToken'],
                        "name": od['productName'],
                        "quantity": od['count'],
                        "price": od['price']
                    })
                })
                gtag('event', 'purchase', {
                    "transaction_id": orderID,
                    "value": amount,
                    "currency": "TWD",
                    "shipping": 0,
                    "items": gaItems
                });
                gtag('event', 'conversion', {
                    'send_to': 'AW-718456390/upQyCK7GiMQBEMaMy9YC',
                    'transaction_id': orderID,
                    'value': amount,
                    'currency': 'TWD'
                });
            });
        },3000);

        return () => {
            clearTimeout(delay)
        };
    },[]);

    return(
        <>
            <PayMethodInfo 
                data    = {info}
            />
            <Receiving 
                data    = {info}
            />
            <Product 
                list    = {info['orderDetail'] || []}
                amount  = {info['amount']      || 0 }
            />

            <Loading loading={loading} />
        </>
    );
}

const mapStateToProps = state =>{
    return{

    }
}

export default connect( mapStateToProps )( Index );