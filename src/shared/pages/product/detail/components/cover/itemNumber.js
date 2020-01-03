/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React                                 from "react";

// Modules
import Quantity                              from '../../../../../module/quantity';

// Lang
import lang                                  from '../../../../../public/lang/lang.json';

export default ({initVal=1, itemNumMax, returnForm}) => {
    return(
        <div className="detail-cover-row cover-quantity">
            <label>{lang['zh-TW']['label']['buy quantity']}</label>
            <Quantity
                initVal     = {initVal}
                itemNumMax  = {itemNumMax||0}
                returnForm  = {returnForm.bind(this)}
            />
        </div>
    );
}