/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';

// Components
import Delivery       from './components/delivery';
import Refund         from './components/refund';

export default ({handleCancel, actionType, oederData,itemData, location}) => {
    switch( actionType ){
        case 'deliveryStatus':
            return(
                <Delivery
                    oederData       = {oederData}
                    itemData        = {itemData}
                    location        = {location}
                    handleCancel    = {handleCancel}
                />
            );

        case 'refundStatus':
            return(
                <Refund
                    oederData       = {oederData}
                    itemData        = {itemData}
                    location        = {location}
                    handleCancel    = {handleCancel}
                />
            );

        default:
            return null;
    }
}