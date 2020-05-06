/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                         from 'react';
import { connect }                   from 'react-redux';

// Components
import OtherInfo                     from './otherInfo';

// Lang
import lang                          from '../../../../../../public/lang/lang.json';

const PayMethodInfo = props => {

    const { data } = props;

    return(
        <section className="container-unit">
            <div className="unit-head">
                <h3>付款明細</h3>
            </div>
            <ul className="card-form-list">
                <li className="pb-0">
                    <label>付款狀態</label>
                    <div><span className={`orderStatus ${data['orderStatus']}`}>{ lang['zh-TW']['orderStatus'][data['orderStatus']] }</span></div>
                </li>
                <li>
                    <label className="empty"></label>
                    <div>若訂單狀態不是付款成功，即不會進行扣款及出貨</div>
                </li>
                <li>
                    <label>付款方式</label>
                    <div>{ lang['zh-TW']['payment'][data['payMethod']] }</div>
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