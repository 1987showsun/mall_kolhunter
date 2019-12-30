/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState } from 'react';

// Stylesheets
import './public/stylesheets/style.scss';

export default props => {

    const { popupStatus, children, className } = props;

    return(
        <div className={`popup-wrap ${className||''} ${popupStatus||false}`}>
            <div className="popup-mask" onClick={props.returnPopupStatus.bind(this)}/>
            <div className="popup-container">
                {children}
            </div>
        </div>
    );
}