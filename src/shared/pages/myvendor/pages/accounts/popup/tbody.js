/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';
import CurrencyFormat from 'react-currency-format';

export default ({productToken, productName, price, itemNum, amount, vendorFeeSplit, vendorFee}) => {
    return(
        <>
            <div className="table-new-cell">{productToken}</div>
            <div className="table-new-cell">{productName}</div>
            <div className="table-new-cell text-right money"><CurrencyFormat value={price}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            <div className="table-new-cell text-right money">{itemNum}</div>
            <div className="table-new-cell text-right money"><CurrencyFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            <div className="table-new-cell text-right money"><CurrencyFormat value={vendorFeeSplit*100} displayType={'text'} thousandSeparator={true} /> ％</div>
            <div className="table-new-cell text-right money"><CurrencyFormat value={vendorFee} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
        </>
    );
}