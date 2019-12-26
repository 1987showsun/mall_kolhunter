/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link }       from 'react-router-dom';

export default ({orderID, orderName, methodText, orderStatus, statusText, amount, createTimeMs}) => {
    return(
        <>
            <div className="table-new-cell">
                <Link to={`/myvendor/planform/record/info/${orderID}`}>{orderID}</Link>
            </div>
            <div className="table-new-cell">{orderName}</div>
            <div className="table-new-cell">{methodText}</div>
            <div className="table-new-cell"><span className={`orderStatus ${orderStatus}`}>{statusText}</span></div>
            <div className="table-new-cell">
                <CurrencyFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div className="table-new-cell">{createTimeMs}</div>
        </>
    );
}