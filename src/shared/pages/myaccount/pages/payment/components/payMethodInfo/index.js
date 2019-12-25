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
                <li>
                    <label>付款狀態</label>
                    <div>{ lang['zh-TW']['orderStatus'][data['orderStatus']] }</div>
                </li>
                <li>
                    <label>付款方式</label>
                    <div>{ lang['zh-TW']['payment'][data['payMethod']] }</div>
                </li>
                <OtherInfo 
                    data= {data}
                />
            </ul>
        </section>
    );
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( PayMethodInfo );