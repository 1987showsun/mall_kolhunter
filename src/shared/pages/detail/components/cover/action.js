/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                                 from 'react';
import { FontAwesomeIcon }                   from '@fortawesome/react-fontawesome';
import { faShoppingCart }                    from '@fortawesome/free-solid-svg-icons';

// Lang
import lang                                  from '../../../../public/lang/lang.json';

export default ({callCarts, lock, itemNumMax}) => {
    return(
        <>
            {
                itemNumMax!=0?(
                    <div className="detail-cover-row cover-action">
                        <ul>
                            <li className="add-cart-li">
                                <button type="button" className="add-cart" disabled={lock} onClick={callCarts.bind(this,"add")}>
                                    <i><FontAwesomeIcon icon={faShoppingCart}/></i>
                                    {lang['zh-TW']['button']['add to cart']}
                                </button>
                            </li>
                            <li className="direct-purchase-li">
                                <button type="button" className="direct-purchase" disabled={lock} onClick={callCarts.bind(this,"direct")}>
                                    {lang['zh-TW']['button']['buy now']}
                                </button>
                            </li>
                        </ul>
                    </div>
                ):(
                    <div className="detail-cover-row cover-action">
                            <ul>
                            <li className="add-cart-li">
                                <button type="button" className="soldOut" disabled={lock} onClick={callCarts.bind(this,"soldOut")}>
                                    {lang['zh-TW']['button']['sold out']}
                                </button>
                            </li>
                        </ul>
                    </div>
                )
            }
        </>
    );
}