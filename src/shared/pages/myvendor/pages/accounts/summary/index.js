/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import CurrencyFormat from 'react-currency-format';

// Components
export default ({summary}) => {
    const {date, total} = summary;
    const grandTotal = total['profit'] ? (total['profit'] - total['transaction']) : "";
    return(
        <>
            <section className="admin-content-row">
                <article className="admin-content-title">
                    <h4>帳務匯總</h4>
                </article>
                <ul className="table-row-list summary">
                    <li>
                        <label>銷售金額</label>
                        <div className="table-new-cell text-right money"><CurrencyFormat value={total['sales']}   displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                    </li>
                    <li>
                        <label>分潤總額</label>
                        <div className="table-new-cell text-right money"><CurrencyFormat value={total['profit']}   displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                    </li>
                    <li>
                        <label>金流手續費</label>
                        <div className="table-new-cell text-right money"><CurrencyFormat value={total['transaction']}   displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                    </li>
                    <li>
                        <label>應收款項</label>
                        <div className="table-new-cell text-right money"><CurrencyFormat value={grandTotal}   displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                    </li>
                </ul>
            </section>
        </>
    );
}