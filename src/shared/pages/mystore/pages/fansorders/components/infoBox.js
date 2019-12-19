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
                        <CurrencyFormat value={Math.round(saleAmount)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </div>
                </li>
                <li>
                    <div className="info-box-head">總分得利潤</div>
                    <div className="info-box-content">
                        <CurrencyFormat value={Math.round(feeAmount)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </div>
                </li>
                <li>
                    <div className="info-box-head">整體分潤比</div>
                    <div className="info-box-content">
                        { 
                            isNaN(((Math.round(feeAmount)/Math.round(saleAmount))*100).toFixed(2))? (
                                '0％'
                            ):(
                                `${((Math.round(feeAmount)/Math.round(saleAmount))*100).toFixed(2)}％`
                            )
                        }
                    </div>
                </li>
            </ul>
        </section>
    );
}