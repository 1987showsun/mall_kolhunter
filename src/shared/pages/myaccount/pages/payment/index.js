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
        props.dispatch( ordersInfo(pathname,queryString.parse(search)) ).then( res => {
            setPageLoading( false );
            setPayInfo(res);
        });
    },[loading])

    return(
        <>
            <PayMethodInfo 
                data= {info}
            />

            <Receiving 
                data    = {info}
            />

            <Product 
                list    = {info['orderDetail'] || []}
                amount  = {info['amount'] || 0}
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