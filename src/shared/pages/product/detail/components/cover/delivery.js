/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React                                 from "React";

// Components
import OpenSelect                            from '../../../../../module/openSelect';

// Lang
import lang                                  from '../../../../../public/lang/lang.json';

export default ({data, formObject, returnSpecToken}) => {
    return(
        <div className="detail-cover-row cover-select">
            <label>{lang['zh-TW']['label']['delivery']}</label>                            
            <OpenSelect 
                data         = {data}
                name         = "productDeliveryID"
                initSelected = {formObject['productDeliveryID']}
                returnForm   = {returnSpecToken.bind(this)}
            />
        </div>
    );
}