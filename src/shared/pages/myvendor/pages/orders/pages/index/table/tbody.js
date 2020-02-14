/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link }       from 'react-router-dom';

import lang                               from '../../../../../../../public/lang/lang.json';

export default ({orderID, orderName, deliveryName, orderDetail, amount, orderStatus, statusText, refundStatus, refundText, createdate }) => {
    const { deliveryStatus, deliveryCode, deliveryCompany } = orderDetail[0];
    return(
        <>
            <div className="table-new-cell">
                <Link to={`/myvendor/orders/info/${orderID}`}>{orderID}</Link>
            </div>
            <div className="table-new-cell">{orderName}</div>
            <div className="table-new-cell">{deliveryName}</div>
            <div className="table-new-cell text-right money">
                <CurrencyFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
            </div>
            <div className="table-new-cell status"><span className={`orderStatus ${orderStatus}`}>{statusText}</span></div>
            <div className="table-new-cell status">
                { lang['zh-TW']['deliveryStatus'][deliveryStatus] } <br />
                {`貨運公司：${deliveryCompany}`} <br />
                {`包裹號碼：${deliveryCode}`}
            </div>
            <div className="table-new-cell status"><span className={`refundStatus ${refundStatus}`}>{refundText}</span></div>
            <div className="table-new-cell date">{createdate}</div>
        </>
    );
}