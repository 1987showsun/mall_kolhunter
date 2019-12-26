/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';

// stylesheets
import './public/stylesheets/style.scss';

export default ({thead, children=[], className=''}) => {
    return(
        <div className="table-new">
            <div className={`table-new-wrap ${className}`}>
                {  
                    thead!=undefined? (
                        <div className="table-new-row table-new-thead">
                            {thead}
                        </div>
                    ):(
                        null
                    )
                }
                {
                    children.length!=0? (
                        children.map(item => {
                            return(
                                <div key={item['key']} className="table-new-row">
                                    {item}
                                </div>
                            );
                        })
                    ):(
                        null
                    )
                }
            </div>
            {
                children.length==0? (
                    <div className="table-new-null">
                        無任何資料
                    </div>
                ):(
                    null
                )
            }
        </div>
    );
}