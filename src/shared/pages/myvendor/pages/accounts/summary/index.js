/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import CurrencyFormat from 'react-currency-format';

// Components
export default ({summary}) => {
    const {date, total} = summary;
    return(
        <>
            <section className="admin-content-row">
                <article className="admin-content-title">
                    <h4>帳務汇总</h4>
                </article>
                <ul className="table-row-list summary">
                    <li>
                        <label>銷貨收入</label>
                        <div className="table-new-cell text-right money"><CurrencyFormat value={total['income']}   displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                    </li>
                    <li>
                        <label>已退貨</label>
                        <div className="table-new-cell text-right money"><CurrencyFormat value={total['refund']}   displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                    </li>
                    <li>
                        <label>總額</label>
                        <div className="table-new-cell text-right money"><CurrencyFormat value={total['grand']}   displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                    </li>
                </ul>
            </section>
        </>
    );
}