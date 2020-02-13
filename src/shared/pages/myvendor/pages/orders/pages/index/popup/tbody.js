/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';

import { FontAwesomeIcon }    from '@fortawesome/react-fontawesome';
import { faCheck, faTimes }     from '@fortawesome/free-solid-svg-icons';

import lang                               from '../../../../../../../public/lang/lang.json';

export default ({orderID, itemCode, deliveryCode, deliveryCompany, updateDelivery, status, index}) => {
    const handleChange = (event) => {
        updateDelivery(index, event.target.value);
    }

    return(
        <>
            <div className="table-new-cell">{orderID}</div>
            <div className="table-new-cell">{itemCode}</div>
            <div className="table-new-cell">
                <div className="input-box select">
                    <select name="deliveryCompany" defaultValue={deliveryCompany} onChange={handleChange.bind(this)}>
                        {
                            Object.keys(lang['zh-TW']['deliveryCompany']).map( (keys,i) => {
                                return (<option key={lang['zh-TW']['deliveryCompany'][keys]} value={lang['zh-TW']['deliveryCompany'][keys]}>{lang['zh-TW']['deliveryCompany'][keys]}</option>);
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="table-new-cell">{deliveryCode}</div>
            <div className="table-new-cell">
                { !!(status) ? <i><FontAwesomeIcon className={`status-${status}`} icon={status=='ok'?faCheck:faTimes} /></i> : null }
            </div>
        </>
    );

}