/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';

// stylesheets
import './public/stylesheets/style.scss';

export default ({children, className=''}) => {
    return(
        <div className={`table-new-wrap ${className}`}>
            {
                children.map(item => {
                    return(
                        <div key={item['key']} className="table-new-row">
                            {item}
                        </div>
                    );
                })
            }
        </div>
    );
}