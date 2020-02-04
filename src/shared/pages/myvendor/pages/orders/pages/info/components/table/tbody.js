/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';
import CurrencyFormat from 'react-currency-format';

// Lang
import lang           from '../../../../../../../../public/lang/lang.json';

export default (props) => {

    const { productName, specName, storeName, deliveryStatus, refundStatus, deliveryCode, amount } = props;
    const refundButtonDisabled = ['none','reject','approve','done'];

    return(
        <>
            <div className="table-new-cell table-new-head">{productName}</div>
            <div className="table-new-cell table-new-head">{specName}</div>
            <div className="table-new-cell">{storeName || 'Mall Kolhunter'}</div>
            <div className="table-new-cell table-new-head">
                {lang['zh-TW']['deliveryStatus'][deliveryStatus]}
                {
                    deliveryCode!='' && deliveryCode!=null? (
                        `（包裹編號：${deliveryCode}）`
                    ):(
                        null
                    )
                }
                <button className="change-status" onClick={props.handleClick.bind(this,'deliveryStatus',props)}>變更狀態</button>
            </div>
            <div className="table-new-cell table-new-head">
                目前狀態：{lang['zh-TW']['refundStatusEnum'][refundStatus]}
                <button className="change-status" disabled={refundButtonDisabled.includes(refundStatus)} onClick={props.handleClick.bind(this,'refundStatus',props)}>變更狀態</button>
            </div>
            <div className="table-new-cell text-right money">
                <CurrencyFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
            </div>
        </>
    );
}