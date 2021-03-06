/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                         from 'react';
import dayjs                         from 'dayjs';
import { connect }                   from 'react-redux';

// Components
import OtherInfo                     from './otherInfo';

// Lang
import lang                          from '../../../../../../../../public/lang/lang.json';

const PayMethodInfo = ({data, tableBodyData}) => {

    const { orderID, orderStatus, createTimeMs, payMethod } = data;

    return(
        <section className="container-unit">
            <div className="unit-head">
                <h3>付款明細</h3>
            </div>
            <ul className="card-form-list">
                <li>
                    <label>訂單編號</label>
                    <div>{orderID}</div>
                </li>
                <li className="pb-0">
                    <label>訂單狀態</label>
                    <div><span className={`orderStatus ${orderStatus}`}>{lang['zh-TW']['orderStatus'][orderStatus]}</span></div>
                </li>
                <li>
                    <label className="empty"></label>
                    <div>若訂單狀態不是付款成功，即不會進行扣款及出貨</div>
                </li>
                <li>
                    <label>訂購數量</label>
                    <div>{tableBodyData.length}</div>
                </li>
                <li>
                    <label>訂購日期</label>
                    <div>{dayjs(createTimeMs).format("YYYY / MM / DD")}</div>
                </li>
                <li>
                    <label>付款方式</label>
                    <div>{lang['zh-TW']['payment'][payMethod]}</div>
                </li>
            </ul>
        </section>
    );
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( PayMethodInfo );