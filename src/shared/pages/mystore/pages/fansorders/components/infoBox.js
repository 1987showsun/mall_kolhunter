/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState }      from 'react';
import CurrencyFormat           from 'react-currency-format';

export default (props) => {

    const { feeAmount, saleAmount } = props;

    return(
        <section className="container-unit">
            <ul className="info-box-ul">
                <li>
                    <div className="info-box-head">總銷售金額</div>
                    <div className="info-box-content">
                        <CurrencyFormat value={Math.ceil(saleAmount)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </div>
                </li>
                <li>
                    <div className="info-box-head">總分得利潤</div>
                    <div className="info-box-content">
                        <CurrencyFormat value={Math.ceil(feeAmount)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </div>
                </li>
                <li>
                    <div className="info-box-head">整體分潤比</div>
                    <div className="info-box-content">
                        { 
                            isNaN(((Math.ceil(feeAmount)/Math.ceil(saleAmount))*100).toFixed(2))? (
                                '0％'
                            ):(
                                `${((Math.ceil(feeAmount)/Math.ceil(saleAmount))*100).toFixed(2)}％`
                            )
                        }
                    </div>
                </li>
            </ul>
        </section>
    );
}