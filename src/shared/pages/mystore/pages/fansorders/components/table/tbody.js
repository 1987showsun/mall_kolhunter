/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';
import CurrencyFormat from 'react-currency-format';

export default ({orderID, productName, count, purchasePrice, totalPrice, kolFeeSplit, productFee, refundStatus}) => {
    return(
        <>
            <div className="table-new-cell table-new-head">{orderID}{refundStatus!='none' ? ' (已退貨)' : ''}</div>
            <div className="table-new-cell table-new-head">{productName}</div>
            <div className="table-new-cell table-new-head text-right">
                <CurrencyFormat value={count} displayType={'text'} thousandSeparator={true} />
            </div>
            <div className={`table-new-cell table-new-head text-right money` + (refundStatus!='none' ? ' refunded' : '')}>
                <CurrencyFormat value={purchasePrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div className={`table-new-cell table-new-head text-right money` + (refundStatus!='none' ? ' refunded' : '')}>
                <CurrencyFormat value={totalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div className={`table-new-cell table-new-head text-right money` + (refundStatus!='none' ? ' refunded' : '')}>
                <CurrencyFormat value={kolFeeSplit*100} displayType={'text'} thousandSeparator={true} /> ％
            </div>
            <div className={`table-new-cell table-new-head text-right money` + (refundStatus!='none' ? ' refunded' : '')}>
                <CurrencyFormat value={productFee} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
        </>
    );
}