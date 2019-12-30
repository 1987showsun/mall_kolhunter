/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';
import CurrencyFormat from 'react-currency-format';

export default ({handleShowOrderDetail ,orderID, orderName, orderDetail, orderStatus, orderStatusText, orderTimeMs, amount, totalVendorFeeSplit, vendorFee ,transactionFee}) => {
    return(
        <>
            <div className="table-new-cell link" onClick={handleShowOrderDetail.bind(this)}>{orderID}</div>
            <div className="table-new-cell">{orderName}</div>
            <div className="table-new-cell status"><span className={`orderStatus ${orderStatus}`}>{orderStatusText}</span></div>
            <div className="table-new-cell text-right money"><CurrencyFormat value={transactionFee} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            <div className="table-new-cell text-right money"><CurrencyFormat value={totalVendorFeeSplit} displayType={'text'} thousandSeparator={true} /> ％</div>
            <div className="table-new-cell text-right money"><CurrencyFormat value={vendorFee} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            <div className="table-new-cell date">{orderTimeMs}</div>
        </>
    );
}