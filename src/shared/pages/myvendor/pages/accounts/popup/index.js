/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';

// Components
import Thead from './thead';
import Tbody from './tbody';

// Modules
import Table from '../../../../../module/table-new';

export default ({list}) => {
    return(
        <>
            <div className="popup-head">
                <h3>帳務訂單商品列表</h3>
            </div>
            <Table 
                thead = {<Thead />}
            >
                {
                    list.map( (item, i) => {
                        return (<Tbody key={i} {...item}/>);
                    })
                }
            </Table>
        </>
    );
}