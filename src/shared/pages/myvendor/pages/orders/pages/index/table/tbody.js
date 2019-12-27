/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link }       from 'react-router-dom';

export default ({orderID, orderName, deliveryName, orderDetail, amount, orderStatus, statusText, createdate }) => {
    return(
        <>
            <div className="table-new-cell">
                <Link to={`/myvendor/orders/info/${orderID}`}>{orderID}</Link>
            </div>
            <div className="table-new-cell">{orderName}</div>
            <div className="table-new-cell">{deliveryName}</div>
            <div className="table-new-cell text-right">
                <CurrencyFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
            </div>
            <div className="table-new-cell"><span className={`orderStatus ${orderStatus}`}>{statusText}</span></div>
            <div className="table-new-cell">{createdate}</div>
        </>
    );
}