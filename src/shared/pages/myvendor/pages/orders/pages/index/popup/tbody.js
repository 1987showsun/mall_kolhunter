/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';

export default ({orderID, detailID, deliveryCode, deliveryCompany, updateDelivery, availableDeliveryCo, i}) => {

    const handleChange = (event) => {
        updateDelivery(i, availableDeliveryCo[availableDeliveryCo.indexOf(event.target.value)]);
    }

    return(
        <>
            <div className="table-new-cell">{orderID}</div>
            <div className="table-new-cell">{detailID}</div>
            <div className="table-new-cell">
                <div className="input-box select">
                    <select name="deliveryCompany" defaultValue={deliveryCompany} onChange={handleChange.bind(this)}>
                        {
                            availableDeliveryCo.map( (val) => {
                                return (<option value={val}>{val}</option>)
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="table-new-cell">{deliveryCode}</div>
        </>
    );

}