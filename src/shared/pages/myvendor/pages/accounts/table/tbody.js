/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';
import CurrencyFormat from 'react-currency-format';

export default ({orderID, orderName, orderDetail, orderStatus, orderTimeMs, amount, vendorFee}) => {
    return(
        <>
            <div className="table-new-cell">{orderID}</div>
            <div className="table-new-cell">{orderName}</div>
            <div className="table-new-cell text-right money">{orderDetail.length}</div>
            <div className="table-new-cell">{orderStatus}</div>
            <div className="table-new-cell text-right money"><CurrencyFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            <div className="table-new-cell text-right money"><CurrencyFormat value={vendorFee} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            <div className="table-new-cell text-right money"><CurrencyFormat value={0} displayType={'text'} thousandSeparator={true} /></div>
            <div className="table-new-cell">{orderTimeMs}</div>
        </>
    );
}