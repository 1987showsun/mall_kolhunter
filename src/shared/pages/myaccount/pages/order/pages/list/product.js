/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                       from 'react';
import { Link }                    from 'react-router-dom';

// Lang
import lang                        from '../../../../../../public/lang/lang.json';

export default ({orderID, productImgs, productToken, productName, specName, specToken, deliveryStatus, refundStatus, count, amount, spec}) => {
    return(
        <>
            <div className="cell-image">
                <img src={productImgs['path']} alt={productName} title="" />
            </div>
            <div className="cell-dosc">
                <h3><Link to={`/detail/${productToken}`} target="_blank">{productName}</Link></h3>
                <ul>
                    {
                        spec.length==0? (
                            <>
                                <li><label>尺寸 / 型號 / 顏色：</label>{specName || 'N/A'}</li>
                                <li><label>產品編號：</label>{specToken || 'N/A'}</li>
                            </>
                        ):(
                            null
                        )
                    }
                </ul>
            </div>
            <div className={`cell-status`}>{specName || lang['zh-TW']['combined goods']}</div>
            <div className={`cell-status`}><span className={`deliveryStatus ${deliveryStatus}`}>{lang['zh-TW']['deliveryStatus'][deliveryStatus]}</span></div>
            <div className={`cell-status`}><span className={`refundStatus ${refundStatus}`}>{lang['zh-TW']['refundStatusEnum'][refundStatus]}</span></div>
        </>
    );
}