/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState, useEffect }       from 'react';
import { connect }                          from 'react-redux';

// Components
import PayMethodInfo                        from './components/payMethodInfo';
import PaySteps                              from './components/paySteps';
import Receiving                            from './components/receiving';
import Product                              from './components/product';

// Mudels
import Loading                              from '../../../../../../module/loading/mallLoading';

// Actions
import { ordersInfo }                       from '../../../../../../actions/myaccount';

const Index = props => {

    const [ loading     , setPageLoading ]  = useState(true);
    const [ info        , setPayInfo]       = useState({});
    
    useEffect(()=>{
        window.scrollTo(0, 0);
        const { location, match } = props;
        const { pathname }        = location;
        const orderID = match['params']['id'] || "";

        props.dispatch( ordersInfo(pathname,{orderID: orderID}) ).then( res => {
            setPageLoading( false );
            switch( res['status'] ){
                case 200:
                    setPayInfo(res['data']);
                    break;

                default:
                    break;
            }
        });
    },[]);

    const action = ( method ) => {
        const { match, history } = props;
        const id = match['params']['id'];
        switch( method ){
            case 'submit':
                history.push({
                    pathname: `/myaccount/orders/return/${id}`
                })
                break;

            default:
                history.goBack();
                break;
        }
    }

    return(
        <>
            <PayMethodInfo 
                data         = { info }
                tableBodyData= { info['orderDetail'] || [] }
            />
            <PaySteps 
                data         = { info }
            />
            <Receiving 
                data         = { info }
            />
            <Product 
                list         = { info['orderDetail'] || [] }
                amount       = { info['amount']      || 0 }
            />
            <section className="container-unit">
                <div className="container-unit-action">
                    <ul>
                        <li><button onClick={()=> action('cancel')} className="cancel">????????????</button></li>
                        {
                            info['refundAble'] &&
                                <li><button onClick={()=>action('submit')} className="mall-yes">????????????</button></li>
                        }
                    </ul>
                </div>
            </section>

            <Loading loading={loading} />
        </>
    );
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );